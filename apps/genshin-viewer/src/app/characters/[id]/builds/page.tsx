import { /*characterInfo, */ CharacterKey } from "@repo/gi-data/character-info";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, use } from "react";
// import UnityRichTextComponent from "@repo/unity-richtext-react/component";
import { characterBuilds } from "@repo/gi-helper-data/builds";
import { weaponInfo, WeaponKey } from "@repo/gi-data/weapon-info";
import Link from "next/link";
import {
  ArtifactGroupKey,
  artifactGroups,
  artifactInfo,
  ArtifactSetKey,
} from "@repo/gi-data/artifact-info";
import { artifactPieceTypeIcon } from "@repo/gi-data/artifact-piece-types";

const CharacterBuildPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const t = useTranslations();
  const { id: _id } = use(params);
  const id = _id as CharacterKey;
  //   const character = characterInfo.characterMap[id];
  const buildInfo = characterBuilds.find((c) => c.id === id);
  return (
    <div className="mx-2.5 md:mx-0 lg:mx-0 xl:mx-0 rounded-2xl xl:mt-0 col-span-full xl:col-start-3">
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 text-3xl">Builds</div>
              <div className="flex flex-col gap-6 rounded-2xl border-2 p-4 bg-white">
                {buildInfo &&
                  buildInfo.builds.map((build, i) => {
                    return (
                      <div key={i}>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row items-center">
                            <div className="text-lg font-bold">
                              {build.name}
                            </div>
                          </div>
                          <div className="border-t-2 border-opacity-40 pt-1.5 text-sm"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold">
                              {" "}
                              • {t("ui.common.weapon.plural")}
                            </div>
                            <div className="whitespace-pre-wrap select-text flex flex-col">
                              {build.weapons.map((weaponKey, i) => {
                                return (
                                  weaponInfo?.weaponMap[weaponKey] && (
                                    <WeaponView weaponKey={weaponKey} key={i} />
                                  )
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold">
                              {" "}
                              • {t("ui.common.artifact.plural")}
                            </div>
                            <div className="whitespace-pre-wrap select-text flex flex-col">
                              {build.artifactSets.map(
                                (artifactSetConfig, i) => {
                                  let content: ReactNode[] = [];
                                  let heading: string | undefined = undefined;
                                  switch (artifactSetConfig.type) {
                                    case "single":
                                      {
                                        content = [
                                          <CorrectArtifactView
                                            artifact={artifactSetConfig.option}
                                            num={4}
                                            key={0}
                                          />,
                                        ];
                                      }
                                      break;
                                    case "choose-2":
                                      heading =
                                        "Choose Two from the following:";
                                    case "double":
                                      {
                                        content = artifactSetConfig.options.map(
                                          (opt, i) => (
                                            <CorrectArtifactView
                                              artifact={opt}
                                              key={i}
                                              num={2}
                                            />
                                          )
                                        );
                                      }
                                      break;
                                  }
                                  return (
                                    <>
                                      {heading && (
                                        <div className="font-semibold">
                                          {heading}
                                        </div>
                                      )}
                                      <div
                                        className="mt-0.5 flex flex-row flex-wrap gap-2.5"
                                        key={i}
                                      >
                                        {content}
                                      </div>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold">
                              {" "}
                              • Main Stats Priority
                            </div>
                            <div className="whitespace-pre-wrap select-text">
                              {(["sands", "goblet", "circlet"] as const).map(
                                (piece, i) => {
                                  return (
                                    build?.artifactMainStats?.[piece] && (
                                      <div
                                        className="flex flex-row gap-2.5 items-center"
                                        key={i}
                                      >
                                        <Image
                                          src={`https://gi.yatta.moe/assets/UI/${artifactPieceTypeIcon(piece)}.png`}
                                          alt={piece}
                                          width="64"
                                          height="64"
                                          className="inline-block w-8 h-8"
                                        />
                                        <span>
                                          {build.artifactMainStats[piece]}
                                        </span>
                                      </div>
                                    )
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold">
                              {" "}
                              • Substats Priority
                            </div>
                            <div className="whitespace-pre-wrap select-text">
                              {build.artifactSubStats}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold"> • Talent Priority</div>
                            <div className="whitespace-pre-wrap select-text">
                              {build.talentPriority}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="font-bold"> • Ability Tips</div>
                            <div className="whitespace-pre-wrap select-text">
                              {build.abilityTips}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 xl:hidden"></div>
    </div>
  );
};

const ArtifactSetView = ({ id, num }: { id: ArtifactSetKey; num: number }) => {
  const setInfo = artifactInfo.artifactSetMap[id]!;
  return (
    <Link href={`/artifacts/${id}`} className="relative">
      <span className="absolute right-0 m-1 rounded-md bg-black text-white px-1.5 py-1 text-xs font-bold">
        {num}
      </span>
      <Image
        src={`https://gi.yatta.moe/assets/UI/reliquary/${setInfo.pieces.circlet.icon}.png`}
        alt="I"
        width="256"
        height="256"
        className="h-16 w-16 rounded-md border-2"
      />
    </Link>
  );
};

const ArtifactGroupView = ({
  id,
  num,
}: {
  id: ArtifactGroupKey;
  num: number;
}) => {
  const setInfo = artifactGroups.find((e) => e.id === id)!;
  return (
    <div className="flex h-16 items-center rounded-md border-2 px-4">
      <span>
        {setInfo.name} ({num})
      </span>
    </div>
  );
};

const CorrectArtifactView = ({
  artifact: { type, id },
  num,
}: {
  artifact:
    | { type: "set"; id: ArtifactSetKey }
    | { type: "group"; id: ArtifactGroupKey };
  num: number;
}) => {
  switch (type) {
    case "group":
      return <ArtifactGroupView id={id} num={num} />;
    case "set":
      return <ArtifactSetView id={id} num={num} />;
  }
};

const WeaponView = ({ weaponKey }: { weaponKey: WeaponKey }) => {
  const t = useTranslations("dm");
  const weapon = weaponInfo.weaponMap[weaponKey];
  const { icon, nameHash } = weapon;
  const substatInfo = "substatInfo" in weapon ? weapon.substatInfo : undefined;
  return (
    <Link
      href={`/weapons/${weaponKey}`}
      className="flex flex-row items-center w-fit mt-0.5"
    >
      <div className="relative">
        {substatInfo && (
          <span className="absolute right-0 m-1 rounded-md text-xs font-bold bg-white border-2 p-0.5">
            <Image
              src={`/gi-stat-icons/${substatInfo.type}.svg`}
              alt="Substat Icon"
              unoptimized
              width="64"
              height="64"
              className="h-4 w-4"
            />
          </span>
        )}
        <Image
          src={`https://gi.yatta.moe/assets/UI/${icon}.png`}
          alt="I"
          width="256"
          height="256"
          className="h-16 w-16 rounded-md border-2"
        />
      </div>
      <span className="ml-1.5">{t(`${nameHash}`)}</span>
    </Link>
  );
};

export default CharacterBuildPage;
