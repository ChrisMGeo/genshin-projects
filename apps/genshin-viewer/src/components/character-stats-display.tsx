"use client";
import {
  characterAscensionInfo,
  characterStatCurves,
} from "@repo/gi-data/character-info";
import { fightPropsInfo } from "@repo/gi-data/fight-props-info";
import { CharacterInfo } from "@repo/gi-data/generators/character";
import {
  getAscension,
  GIAscensionLevel,
  giMaxLevelForAscension,
  LevelRange,
  type GILevel,
} from "@repo/gi-data/ascension-info";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import { useState } from "react";
import { useTranslations } from "next-intl";

type CurveName = keyof typeof characterStatCurves;
type PromoteId = keyof typeof characterAscensionInfo;

const CharacterStatsDisplay = ({
  atkInfo,
  defInfo,
  hpInfo,
  promoteId,
}: {
  atkInfo: DeepReadonly<CharacterInfo["atkInfo"]>;
  defInfo: DeepReadonly<CharacterInfo["defInfo"]>;
  hpInfo: DeepReadonly<CharacterInfo["hpInfo"]>;
  promoteId: DeepReadonly<CharacterInfo["promoteId"]>;
}) => {
  const t = useTranslations();
  const [level, setLevel] = useState<GILevel>({
    type: "unascended",
    level: 1,
  });
  const [ascendIfPossible, setAscendIfPossible] = useState(false);

  const currentAscension = getAscension(level) as GIAscensionLevel;

  const isAscendable =
    level.level === giMaxLevelForAscension[currentAscension] &&
    currentAscension !== 6;
  const ascend = ascendIfPossible && isAscendable;

  const finalAscension = (currentAscension +
    (ascend ? 1 : 0)) as GIAscensionLevel;

  const maxLevel = giMaxLevelForAscension[finalAscension];
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-6">
        <div>
          {level.level.toString().padStart(2, "0")} / {maxLevel}
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
      <table className="w-full">
        <tbody>
          <tr style={isAscendable ? {} : { display: "none" }}>
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
              />
            </td>
          </tr>
          <tr>
            <td className="flex flex-row items-center gap-2">
              <span>{t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_HP"]}`)}</span>
            </td>
            <td className="text-right">{finalHp}</td>
          </tr>
          <tr>
            <td className="flex flex-row items-center gap-2">
              <span>{t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_ATTACK"]}`)}</span>
            </td>
            <td className="text-right">{finalAtk}</td>
          </tr>
          <tr>
            <td className="flex flex-row items-center gap-2">
              <span>
                {t(`dm.${fightPropsInfo["FIGHT_PROP_BASE_DEFENSE"]}`)}
              </span>
            </td>
            <td className="text-right">{finalDef}</td>
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
  );
};

export default CharacterStatsDisplay;
