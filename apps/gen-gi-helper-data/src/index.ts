import path from "path";
import { google } from "googleapis";
import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";
import { weaponInfo, WeaponKey } from "@repo/gi-data/weapon-info";
import { GIWeaponType } from "@repo/gi-data/weapon-types";
import {
  artifactInfo,
  ArtifactSetKey,
  artifactGroups,
  ArtifactGroupKey,
} from "@repo/gi-data/artifact-info";
import { getTextMap } from "@repo/gi-data/relevant-textmaps";
import Fuse from "fuse.js";
import { writeFileSyncRecursive } from "@repo/utils/fs";

const APP_ROOT = path.resolve(".");
const MONOREPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const GI_HELPER_DATA_ROOT = path.join(
  MONOREPO_ROOT,
  "packages",
  "gi-helper-data"
);
const GI_HELPER_DATA_FINAL_PATH = path.join(
  GI_HELPER_DATA_ROOT,
  "src",
  "builds.ts"
);

const enTextMap = getTextMap("EN");

type UnmodifiedCharacterBuild = {
  weapons: string;
  artifactSets: string;
  artifactMainStats: string;
  artifactSubStats: string;
  talentPriority: string;
  abilityTips: string;
};

type ArtifactSetChoice =
  | { type: "set"; id: ArtifactSetKey }
  | { type: "group"; id: ArtifactGroupKey };

type CharacterBuild = {
  weapons: WeaponKey[];
  artifactSets: (
    | { type: "single"; option: ArtifactSetChoice }
    | {
        type: "choose-2";
        options: ArtifactSetChoice[];
      }
    | {
        type: "double";
        options: [ArtifactSetChoice, ArtifactSetChoice];
      }
  )[];
  artifactMainStats: { sands?: string; goblet?: string; circlet?: string };
  artifactSubStats: string;
  talentPriority: string;
  abilityTips: string;
};

async function main() {
  const translatedCharacterInfo = (
    Object.keys(characterInfo.characterMap) as CharacterKey[]
  ).map((key) => {
    const { nameHash, ...restOfEntry } = characterInfo.characterMap[key];
    return { ...restOfEntry, name: enTextMap[nameHash]! };
  });
  type TranslatedCharacterInfo = (typeof translatedCharacterInfo)[number];

  const translatedWeaponInfo = (
    Object.keys(weaponInfo.weaponMap) as WeaponKey[]
  ).map((key) => {
    const { nameHash, ...restOfEntry } = weaponInfo.weaponMap[key];
    return { ...restOfEntry, name: enTextMap[nameHash]! };
  });
  type TranslatedWeaponInfo = (typeof translatedWeaponInfo)[number];

  const translatedArtifactInfo = (
    Object.keys(artifactInfo.artifactSetMap) as ArtifactSetKey[]
  ).map((key) => {
    const { nameHash, ...restOfEntry } = artifactInfo.artifactSetMap[key];
    return { ...restOfEntry, name: enTextMap[nameHash]! };
  });
  type TranslatedArtifactInfo = (typeof translatedArtifactInfo)[number];

  const fuseOptions = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.5,
  };

  const weaponFuses = Object.fromEntries(
    (["sword", "claymore", "polearm", "bow", "catalyst"] as GIWeaponType[]).map(
      (weaponType) => {
        return [
          weaponType,
          new Fuse(
            translatedWeaponInfo.filter((w) => w.weaponType === weaponType),
            fuseOptions
          ),
        ];
      }
    )
  ) as Record<GIWeaponType, Fuse<TranslatedWeaponInfo>>;
  const credentials = {
    type: process.env.GOOGLEAPIS_TYPE,
    project_id: process.env.GOOGLEAPIS_PROJECT_ID,
    private_key_id: process.env.GOOGLEAPIS_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLEAPIS_PRIVATE_KEY,
    client_email: process.env.GOOGLEAPIS_CLIENT_EMAIL,
    client_id: process.env.GOOGLEAPIS_CLIENT_ID,
    auth_uri: process.env.GOOGLEAPIS_AUTH_URI,
    token_uri: process.env.GOOGLEAPIS_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.GOOGLEAPIS_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLEAPIS_CLIENT_X509_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });

  const googleSheets = google.sheets("v4");

  const spreadsheetId = "1gNxZ2xab1J6o1TuNVWMeLOZ7TPOqrsf3SshP5DLvKzI";

  const sheetNames = [
    "Pyro ",
    "Electro ",
    "Hydro ",
    "Cryo ",
    "Anemo ",
    "Geo ",
    "Dendro",
  ];

  let jsonData: any[] = [];

  const bRowRanges: string[] = sheetNames.map(
    (sheetName) => `${sheetName}!B:B`
  );
  const bRows = await googleSheets.spreadsheets.values.batchGet({
    auth,
    spreadsheetId,
    ranges: bRowRanges,
  });

  const valueRanges = bRows.data.valueRanges;

  let characterRanges: string[] = [];
  if (!valueRanges) return;
  for (let i = 0; i < valueRanges.length; i++) {
    const bRow = valueRanges[i]!.values;
    let lastJ = 0;
    if (!bRow) continue;
    for (let j = 0; j < bRow.length; j++) {
      const cell: string = bRow[j]![0];
      if (!cell) continue;
      if (!cell.toLowerCase().includes("notes")) {
        lastJ = j;
      } else {
        const characterRange: string = `${sheetNames[i]}!B${j + 1}:I${
          lastJ + 1
        }`;
        characterRanges.push(characterRange);
      }
    }
  }
  const characterData = await googleSheets.spreadsheets.values.batchGet({
    auth,
    spreadsheetId,
    ranges: characterRanges,
  });

  const characterValueRanges = characterData.data.valueRanges;
  if (!characterValueRanges) return;
  for (const characterValues of characterValueRanges) {
    if (!characterValues || !characterValues.values) continue;
    const viewName: string = characterValues.values[0]![0].replaceAll(
      "\n",
      " "
    );
    const searchRes = translatedCharacterInfo.find(
      (character) => character.name.toLowerCase() === viewName.toLowerCase()
    );
    if (!searchRes) {
      console.log(`viewName: ${viewName} not found`);
      continue;
    }
    const id = searchRes.id;

    let builds: UnmodifiedCharacterBuild[] = [];
    const weaponType = searchRes.weaponType;
    const notes: string = characterValues.values
      ? characterValues.values.slice(-1)[0]![1]
      : "";
    if (!characterValues.values) continue;
    for (
      let build = 4; // start at 4 to skip the first 4 rows which don't contain build info
      build < characterValues.values.length - 1;
      build++
    ) {
      const buildValues = characterValues.values[build]!.slice(1);
      const buildObject = {
        name: buildValues[0] ?? "",
        weapons: buildValues[1] ?? builds[builds.length - 1]?.weapons ?? "",
        artifactSets:
          buildValues[2] ?? builds[builds.length - 1]?.artifactSets ?? "",
        artifactMainStats:
          buildValues[3] ?? builds[builds.length - 1]?.artifactMainStats ?? "",
        artifactSubStats:
          buildValues[4] ?? builds[builds.length - 1]?.artifactSubStats ?? "",
        talentPriority:
          buildValues[5] ?? builds[builds.length - 1]?.talentPriority ?? "",
        abilityTips: buildValues[6] ?? "",
      };
      builds.push(buildObject);
    }
    const relevantArtifactTypes = ["sands", "goblet", "circlet"] as const;
    const modifiedBuilds: CharacterBuild[] = builds.map(
      ({
        weapons: _weapons,
        artifactSets,
        artifactMainStats: _artifactMainStats,
        ...rest
      }) => {
        let artifactMainStats: {
          sands: string;
          goblet: string;
          circlet: string;
        } = {
          sands: "",
          goblet: "",
          circlet: "",
        };
        const prefixes = [" - ", ": "];
        _artifactMainStats.split("\n").forEach((line) => {
          for (const type of relevantArtifactTypes) {
            for (const prefix of prefixes) {
              const prefixed = type + prefix;
              if (line.toLowerCase().startsWith(prefixed)) {
                artifactMainStats[type] = line.slice(prefixed.length);
                break;
              }
            }
          }
        });
        const weapons = _weapons
          .split("\n")
          .filter((line: string | undefined) => line)
          .map((line: string) => {
            const result = weaponFuses[weaponType].search(line)?.[0]?.item?.id;
            if (!result) {
              console.log(`${line}`);
              console.log(`\t${result}`);
            }
            return result;
          })
          .filter((a: WeaponKey | undefined) => a) as WeaponKey[];
        return {
          ...rest,
          weapons,
          artifactMainStats,
          artifactSets: artifactSets
            .split("\n")
            .map((line: string) => {
              let sets = [];
              let changed = true;
              while (changed) {
                changed = false;
                for (let artifact of translatedArtifactInfo) {
                  const indexOf = line.indexOf(artifact.name);
                  if (indexOf >= 0) {
                    sets.push({ type: "set", id: artifact.id });
                    line =
                      line.slice(0, indexOf) +
                      line.slice(indexOf + artifact.name.length);
                    changed = true;
                  }
                }
                for (let group of artifactGroups) {
                  const indexOf = line.indexOf(group.name);
                  if (indexOf >= 0) {
                    sets.push({ type: "group", id: group.id });
                    line =
                      line.slice(0, indexOf) +
                      line.slice(indexOf + group.name.length);
                    changed = true;
                  }
                }
              }
              if (sets.length === 0) {
                return undefined;
              } else if (sets.length === 1) {
                return { type: "single", option: sets[0] };
              } else if (sets.length === 2) {
                return {
                  type: "double",
                  options: [sets[0], sets[1]],
                };
              } else {
                return {
                  type: "choose-2",
                  options: sets,
                };
              }
            })
            .filter((a) => a) as CharacterBuild["artifactSets"],
        };
      }
    );
    const character = {
      id,
      weaponType,
      notes,
      builds: modifiedBuilds,
    };
    jsonData.push(character);
  }
  const stringifiedData = JSON.stringify(jsonData, null, 2);
  writeFileSyncRecursive(
    GI_HELPER_DATA_FINAL_PATH,
    `export const characterBuilds = ${stringifiedData} as const;`
  );
}

main();
