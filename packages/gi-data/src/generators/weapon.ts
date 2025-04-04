import { pascalize } from "@repo/utils/pascalize";
import {
  GIWeaponType,
  GIWeaponTypeInGame,
  translateWeaponType,
} from "../consts/weapon-types.js";
import WeaponCodex from "../generated/excel-bin-output/weapon-codex.js";
import Weapon from "../generated/excel-bin-output/weapon.js";
import WeaponCurve from "../generated/excel-bin-output/weapon-curve.js";
import WeaponPromote from "../generated/excel-bin-output/weapon-promote.js";
import { getTextMap } from "../consts/textmaps.js";
import { baseAtk, GIFightPropInGame } from "../consts/fight-props.js";
import EquipAffix from "../generated/excel-bin-output/equip-affix.js";

export type WeaponInfo = {
  id: string;
  weaponId: number;

  weaponType: GIWeaponType;
  rarity: 1 | 2 | 3 | 4 | 5;

  nameHash: number;
  descHash: number;

  refinementInfo: RefinementInfo[];

  atkInfo: StatInfo;
  substatInfo?: {
    type: string;
    info: StatInfo;
  };

  promoteId: number;

  icon: string;
  awakenIcon: string;
};

export type RefinementInfo = {
  nameHash: number;
  descHash: number;
};

export type StatInfo = {
  initial: number;
  curve: string;
};

const enTextMap = getTextMap("EN");

export const getWeaponInfos = (): {
  relevantHashes: Set<number>;
  weaponMap: { [key: string]: WeaponInfo };
} => {
  let relevantHashes = new Set<number>();
  let weaponMap: { [key: string]: WeaponInfo } = {};

  for (const { weaponId, isDisuse } of WeaponCodex) {
    if (isDisuse) continue;
    const {
      rankLevel: rarity,
      nameTextMapHash: nameHash,
      descTextMapHash: descHash,
      skillAffix: [skillAffixId],
      weaponType: _weaponType,
      icon,
      awakenIcon,
      weaponProp: [baseAtkProp, substatProp, ..._],
      weaponPromoteId: promoteId,
    } = Weapon.find((w) => w.id === weaponId)!;

    const enName = enTextMap[nameHash];
    if (!enName) continue;

    const id = pascalize(enName);

    const weaponType = translateWeaponType(_weaponType as GIWeaponTypeInGame);

    const { initValue, type } = baseAtkProp!;

    const atkInfo: StatInfo = {
      initial: initValue!,
      curve: type,
    };

    let substatInfo: WeaponInfo["substatInfo"] = undefined;
    if (
      substatProp &&
      substatProp.propType &&
      substatProp.initValue &&
      substatProp.type
    ) {
      substatInfo = {
        type: substatProp.propType as GIFightPropInGame,
        info: {
          curve: substatProp.type,
          initial: substatProp.initValue,
        },
      };
    }

    relevantHashes.add(nameHash);
    relevantHashes.add(descHash);

    const refinementInfo = EquipAffix.filter((s) => s.id === skillAffixId).map(
      ({ descTextMapHash: descHash, nameTextMapHash: nameHash }) => {
        relevantHashes.add(nameHash);
        relevantHashes.add(descHash);
        return {
          nameHash,
          descHash,
        };
      }
    );

    weaponMap[id] = {
      id,
      weaponId,
      weaponType,
      rarity: rarity as 1 | 2 | 3 | 4 | 5,

      nameHash,
      descHash,

      refinementInfo,

      atkInfo,
      substatInfo,

      promoteId,

      icon,
      awakenIcon,
    };
  }

  return {
    relevantHashes,
    weaponMap,
  };
};

export type WeaponCurveMap = {
  [curveType: string]: { [level: number]: number };
};

export const getWeaponCurves = (): WeaponCurveMap => {
  let res: WeaponCurveMap = {};
  for (const { level, curveInfos } of WeaponCurve) {
    for (const { type: curveType, value: levelMultiplier } of curveInfos) {
      if (res[curveType] === undefined) {
        res[curveType] = {};
      }
      res[curveType][level] = levelMultiplier;
    }
  }
  return res;
};

export type WeaponPromoteMap = {
  [promoteId: number]: {
    [promoteLevel: number]: number;
  };
};

export const getWeaponPromoteInfo = (): WeaponPromoteMap => {
  let res: WeaponPromoteMap = {};
  for (const {
    weaponPromoteId: promoteId,
    AKPHFJACMIB: promoteLevel = 0,
    addProps,
  } of WeaponPromote) {
    const { value: atkValue = 0 } = addProps.find(
      (p) => p.propType === baseAtk.inGameId
    )!;

    if (res[promoteId] === undefined) {
      res[promoteId] = {};
    }

    res[promoteId][promoteLevel] = atkValue;
  }
  return res;
};
