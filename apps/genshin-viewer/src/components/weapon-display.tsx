"use client";
import {
  getAscension,
  GIAscensionLevel,
  GILevel,
  giMaxLevelForAscension,
  LevelRange,
} from "@repo/gi-data/ascension-info";
import { GIFightPropInGame } from "@repo/gi-data/fight-props";
import { fightPropsInfo } from "@repo/gi-data/fight-props-info";
import { WeaponInfo } from "@repo/gi-data/generators/weapon";
import {
  weaponAscensionInfo,
  weaponStatCurves,
} from "@repo/gi-data/weapon-info";
import UnityRichTextComponent from "@repo/unity-richtext-react/component";
import { capitalizeFirstLetter } from "@repo/utils/capitalize-first-letter";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import Image from "next/image";
import { useEffect, useState } from "react";

type CurveName = keyof typeof weaponStatCurves;
type PromoteId = keyof typeof weaponAscensionInfo;

type WeaponDisplayProps = DeepReadonly<
  Pick<
    WeaponInfo,
    | "rarity"
    | "weaponType"
    | "atkInfo"
    | "refinementInfo"
    | "icon"
    | "descHash"
    | "promoteId"
    | "substatInfo"
  >
>;
const WeaponDisplay = ({
  rarity,
  weaponType,
  atkInfo,
  refinementInfo,
  promoteId,
  icon,
  descHash,
  substatInfo,
}: WeaponDisplayProps) => {
  const t = useTranslations();

  const maxAscension: GIAscensionLevel = rarity <= 2 ? 4 : 6;

  const [level, setLevel] = useState<GILevel>({ type: "unascended", level: 1 });
  const [refinement, setRefinement] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [ascendIfPossible, setAscendIfPossible] = useState(false);

  const currentAscension = getAscension(level);

  const isAscendable =
    level.level === giMaxLevelForAscension[currentAscension] &&
    currentAscension !== maxAscension;

  const ascend = ascendIfPossible && isAscendable;

  const finalAscension = (currentAscension +
    (ascend ? 1 : 0)) as GIAscensionLevel;
  const ascensionInfo = weaponAscensionInfo[promoteId.toString() as PromoteId];
  type AscensionInfoKey = keyof typeof ascensionInfo;

  const finalAtk =
    atkInfo.initial *
      weaponStatCurves[atkInfo.curve as CurveName][level.level] +
    ascensionInfo[finalAscension.toString() as AscensionInfoKey];
  const finalSubstat = substatInfo
    ? substatInfo.info.initial *
      weaponStatCurves[substatInfo.info.curve as CurveName][level.level]
    : 0;

  useEffect(() => {
    setAscendIfPossible(false);
  }, [level]);
  return (
    <div>
      <div className="relative flex flex-row rounded-t-lg bg-white h-48 lg:h-56">
        <div className="flex flex-col">
          <div className="flex flex-col pt-4 pl-4">
            <div>
              <div className="text-lg">{capitalizeFirstLetter(weaponType)}</div>
              <div>
                <div className="text-opacity-70 md:text-lg lg:text-lg xl:text-xl">
                  Base ATK
                </div>
                <div className="text-xl lg:text-2xl xl:text-3xl">
                  {Math.round(finalAtk)}
                </div>
              </div>
              {substatInfo && (
                <div>
                  <div className="text-opacity-70 md:text-lg lg:text-lg xl:text-xl">
                    {t(
                      `dm.${fightPropsInfo[substatInfo.type as GIFightPropInGame]}`
                    )}
                  </div>
                  <div className="text-xl lg:text-2xl xl:text-3xl">
                    {finalSubstat}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-auto flex flex-row gap-1 pb-4 pl-4">
            {[...Array(rarity)].map((_, i) => (
              <div key={i}>★</div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            src={`https://gi.yatta.moe/assets/UI/${icon}.png`}
            alt="Item icon"
            loading="eager"
            height="256"
            width="256"
            className="w-48 lg:w-56"
          />
        </div>
      </div>
      <div className="rounded-b-2xl bg-white p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-6 font-semibold">
            <div className="flex select-none flex-row gap-2">
              <div className="flex w-20 flex-shrink-0 cursor-pointer flex-row items-center gap-2 rounded-l-md rounded-r-2xl text-xl">
                Lv. {level.level}
                <span className={clsx(ascend ? "" : "invisible")}>+</span>
              </div>
            </div>
            <input
              type="range"
              className="slider-star my-2 w-full"
              min="1"
              max={`${giMaxLevelForAscension[maxAscension]}`}
              step="1"
              defaultValue="1"
              onChange={(e) =>
                setLevel({
                  type: "unascended",
                  level: parseInt(e.target.value) as LevelRange,
                })
              }
            />
          </div>
          {refinementInfo.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <select
                  className="flex rounded-md px-1 text-center text-2xl"
                  onChange={(e) =>
                    setRefinement(parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4)
                  }
                >
                  {refinementInfo.map((_, i) => {
                    return (
                      <option value={`${i}`} key={i}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div>
                  {refinementInfo[refinement] && (
                    <>
                      <div className="text-lg">
                        {refinementInfo[refinement]
                          ? t(`dm.${refinementInfo[refinement].nameHash}`)
                          : ""}
                      </div>
                      <div className="font-bold select-text">
                        <UnityRichTextComponent>
                          {t
                            .raw(`dm.${refinementInfo[refinement].descHash}`)
                            .split("\\n")
                            .join("\n")}
                        </UnityRichTextComponent>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="w-full border-2"></div>
          <div className="select-text">
            <UnityRichTextComponent>
              {t.raw(`dm.${descHash}`).split("\\n").join("\n")}
            </UnityRichTextComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponDisplay;
