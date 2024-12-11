import {
  getCharacterInfos,
  getAvatarCurves,
  getAvatarPromoteInfo,
} from "@repo/gi-data/generators/character";
import {
  getWeaponInfos,
  getWeaponCurves,
  getWeaponPromoteInfo,
} from "@repo/gi-data/generators/weapon";
import { getArtifactInfos } from "@repo/gi-data/generators/artifact";
import { getFightPropInfos } from "@repo/gi-data/generators/fight-props";
import { writeFileSync } from "fs";
import path from "path";
import { getTextMap, GITextMap } from "@repo/gi-data/textmaps";
import { writeFileSyncRecursive } from "@repo/utils/fs";
import { giLanguages } from "@repo/gi-data/languages";

const APP_ROOT = path.resolve(".");
const MONOREPO_ROOT = path.resolve(APP_ROOT, "..", "..");
const GI_DATA_ROOT = path.join(MONOREPO_ROOT, "packages", "gi-data");
const GI_DATA_EXPORTS = path.join(GI_DATA_ROOT, "src", "generated");

const { relevantHashes: characterRelHashes, ...restOfCharacterInfo } =
  getCharacterInfos();
const characterInfo = {
  ...restOfCharacterInfo,
  relevantHashes: [...characterRelHashes],
};
const characterInfoStr = JSON.stringify(characterInfo, null, 2);

const characterStatCurves = getAvatarCurves();
const characterStatCurvesStr = JSON.stringify(characterStatCurves, null, 2);

const characterAscensionInfo = getAvatarPromoteInfo();
const characterAscensionInfoStr = JSON.stringify(
  characterAscensionInfo,
  null,
  2
);

const { relevantHashes: weaponRelHashes, ...restOfWeaponInfo } =
  getWeaponInfos();
const weaponInfo = {
  ...restOfWeaponInfo,
  relevantHashes: [...weaponRelHashes],
};
const weaponInfoStr = JSON.stringify(weaponInfo, null, 2);

const weaponStatCurves = getWeaponCurves();
const weaponStatCurvesStr = JSON.stringify(weaponStatCurves, null, 2);

const weaponAscensionInfo = getWeaponPromoteInfo();
const weaponAscensionInfoStr = JSON.stringify(weaponAscensionInfo, null, 2);

const { relevantHashes: artifactRelHashes, ...restOfArtifactInfo } =
  getArtifactInfos();
const artifactInfo = {
  ...restOfArtifactInfo,
  relevantHashes: [...artifactRelHashes],
};
const artifactInfoStr = JSON.stringify(artifactInfo, null, 2);

const fightPropsInfo = getFightPropInfos();
const fightPropsInfoStr = JSON.stringify(fightPropsInfo, null, 2);
const fightPropsHashes = Object.values(fightPropsInfo);

const relevantHashes = new Set([
  ...characterRelHashes,
  ...weaponRelHashes,
  ...artifactRelHashes,
  ...fightPropsHashes,
]);

for (const lang of giLanguages) {
  const textMap = getTextMap(lang);
  let relevantTextMap: GITextMap = {};
  for (const hash of relevantHashes) {
    relevantTextMap[hash] = textMap[hash]!;
  }
  const relevantTextMapPath = path.join(
    GI_DATA_EXPORTS,
    "relevant-textmap",
    `${lang}.json`
  );
  const relevantTextMapContents = JSON.stringify(relevantTextMap, null, 2);
  writeFileSyncRecursive(relevantTextMapPath, relevantTextMapContents);
  console.log(`Write to "${relevantTextMapPath}" was successful...`);
}

// character-info.ts
const characterInfoLines = [
  "// generated by gen-gi-data",
  `export const characterInfo = ${characterInfoStr} as const;`,
  `export type CharacterKey = keyof (typeof characterInfo)["characterMap"];`,
  `export const characterStatCurves = ${characterStatCurvesStr} as const;`,
  `export const characterAscensionInfo = ${characterAscensionInfoStr} as const;`,
];
const characterInfoContents = characterInfoLines.join("\n");
const characterInfoPath = path.join(GI_DATA_EXPORTS, "character-info.ts");

writeFileSync(characterInfoPath, characterInfoContents);
console.log(`Write to "${characterInfoPath}" was successful...`);

// weapon-info.ts
const weaponInfoLines = [
  "// generated by gen-gi-data",
  `export const weaponInfo = ${weaponInfoStr} as const;`,
  `export type WeaponKey = keyof (typeof weaponInfo)["weaponMap"];`,
  `export const weaponStatCurves = ${weaponStatCurvesStr} as const;`,
  `export const weaponAscensionInfo = ${weaponAscensionInfoStr} as const;`,
];
const weaponInfoContents = weaponInfoLines.join("\n");
const weaponInfoPath = path.join(GI_DATA_EXPORTS, "weapon-info.ts");

writeFileSync(weaponInfoPath, weaponInfoContents);
console.log(`Write to "${weaponInfoPath}" was successful...`);

// artifact-info.ts
const artifactInfoLines = [
  "// generated by gen-gi-data",
  `export const artifactInfo = ${artifactInfoStr} as const;`,
  `export type ArtifactSetKey = keyof (typeof artifactInfo)["artifactSetMap"];`,
];
const artifactInfoContents = artifactInfoLines.join("\n");
const artifactInfoPath = path.join(GI_DATA_EXPORTS, "artifact-info.ts");

writeFileSyncRecursive(artifactInfoPath, artifactInfoContents);
console.log(`Write to "${artifactInfoPath}" was successful...`);

// fight-props-info.ts
const fightPropsInfoLines = [
  "// generated by gen-gi-data",
  `export const fightPropsInfo = ${fightPropsInfoStr} as const;`,
];
const fightPropsInfoContents = fightPropsInfoLines.join("\n");
const fightPropsInfoPath = path.join(GI_DATA_EXPORTS, "fight-props-info.ts");

writeFileSyncRecursive(fightPropsInfoPath, fightPropsInfoContents);
console.log(`Write to "${fightPropsInfoPath}" was successful...`);
