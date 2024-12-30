"use client";
import {
  characterAscensionInfo,
  characterStatCurves,
} from "@repo/gi-data/character-info";
import { fightPropsInfo } from "@repo/gi-data/fight-props-info";
import { CharacterInfo } from "@repo/gi-data/generators/character";
import {
  getAscension,
  giMaxLevelForAscension,
  GIAscensionLevel,
  LevelRange,
  type GILevel,
} from "@repo/gi-data/ascension-info";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { getVisionIcon } from "@repo/gi-data/vision-types";
import Image from "next/image";
import { getWeaponTypeIcon } from "@repo/gi-data/weapon-types";

type CurveName = keyof typeof characterStatCurves;
type PromoteId = keyof typeof characterAscensionInfo;

type CharacterStatsDisplayProps = DeepReadonly<
  Pick<
    CharacterInfo,
    | "atkInfo"
    | "defInfo"
    | "hpInfo"
    | "promoteId"
    | "descHash"
    | "vision"
    | "weaponType"
    | "constellationHash"
  >
>;

const CharacterStatsDisplay = ({
  atkInfo,
  defInfo,
  hpInfo,
  promoteId,
  descHash,
  vision,
  weaponType,
  constellationHash,
}: CharacterStatsDisplayProps) => {
  const t = useTranslations();
  const constellation = t(`dm.${constellationHash}`);
  const description = t(`dm.${descHash}`);
  const [level, setLevel] = useState<GILevel>({
    type: "unascended",
    level: 1,
  });
  const [ascendIfPossible, setAscendIfPossible] = useState(false);

  const currentAscension = getAscension(level);

  const isAscendable =
    level.level === giMaxLevelForAscension[currentAscension] &&
    currentAscension !== 6;
  const ascend = ascendIfPossible && isAscendable;

  const finalAscension = (currentAscension +
    (ascend ? 1 : 0)) as GIAscensionLevel;

  // const maxLevel = giMaxLevelForAscension[finalAscension];
  const ascensionInfo =
    characterAscensionInfo[promoteId.toString() as PromoteId];
  const finalHp =
    hpInfo.initial *
      characterStatCurves[hpInfo.curve as CurveName][level.level] +
    ascensionInfo.hp[finalAscension];
  const finalAtk =
    atkInfo.initial *
      characterStatCurves[atkInfo.curve as CurveName][level.level] +
    ascensionInfo.atk[finalAscension];
  const finalDef =
    defInfo.initial *
      characterStatCurves[defInfo.curve as CurveName][level.level] +
    ascensionInfo.def[finalAscension];
  useEffect(() => {
    setAscendIfPossible(false);
  }, [level]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-6 font-semibold">
        <div className="whitespace-nowrap w-20">
          {"Lv. " + level.level.toString().padStart(2, "0")}
          <span className={clsx(ascend ? "" : "invisible")}>+</span>
        </div>

        <input
          type="range"
          min="1"
          max="90"
          step="1"
          defaultValue="1"
          className="w-full"
          onChange={(e) =>
            setLevel({
              type: "unascended",
              level: parseInt(e.target.value) as LevelRange,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <table className="hover w-full">
          <tbody>
            <tr>
              <td className="flex flex-row items-center gap-2">
                <span>Ascend</span>
              </td>
              <td className="text-right">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setAscendIfPossible(e.target.checked);
                  }}
                  checked={ascendIfPossible}
                  disabled={!isAscendable}
                />
              </td>
            </tr>
            <tr>
              <td className="flex flex-row items-center gap-2">
                <span>{t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_HP"]}`)}</span>
              </td>
              <td className="text-right">{Math.round(finalHp)}</td>
            </tr>
            <tr>
              <td className="flex flex-row items-center gap-2">
                <span>
                  {t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_ATTACK"]}`)}
                </span>
              </td>
              <td className="text-right">{Math.round(finalAtk)}</td>
            </tr>
            <tr>
              <td className="flex flex-row items-center gap-2">
                <span>
                  {t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_DEFENSE"]}`)}
                </span>
              </td>
              <td className="text-right">{Math.round(finalDef)}</td>
            </tr>
            <tr>
              <td className="flex flex-row items-center gap-2">
                <span>
                  {t(`dm.${fightPropsInfo[ascensionInfo.ascensionStat.type]}`)}
                </span>
              </td>
              <td className="text-right">
                {ascensionInfo.ascensionStat.values[finalAscension]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2">
        <table className="stat-table hover w-full">
          <tbody>
            <tr>
              <td>Element</td>
              <td className="text-right">
                <Image
                  src={`https://gi.yatta.moe/assets/UI/${getVisionIcon(vision)}.png`}
                  loading="eager"
                  width="64"
                  height="64"
                  alt="Avatar Element"
                  className="ml-auto w-8 p-0.5"
                />
              </td>
            </tr>
            <tr>
              <td>Weapon</td>
              <td className="text-right">
                <Image
                  src={`https://gi.yatta.moe/assets/UI/${getWeaponTypeIcon(weaponType)}.png`}
                  loading="eager"
                  alt="Weapon Type"
                  width="128"
                  height="128"
                  className="ml-auto w-8 p-0.5 drop-shadow-sm"
                />
              </td>
            </tr>
            <tr>
              <td>Constellation</td>
              <td className="text-right">{constellation}</td>
            </tr>
          </tbody>
        </table>
        <div className="select-text px-4 text-opacity-80">{description}</div>
      </div>
    </div>
  );
};

export default CharacterStatsDisplay;
