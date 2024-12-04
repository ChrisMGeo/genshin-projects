export const baseHpName = "FIGHT_PROP_BASE_HP";
export const flatHpName = "FIGHT_PROP_HP";
export const hpPercentName = "FIGHT_PROP_HP_PERCENT";
// export const maxHpName = "FIGHT_PROP_MAX_HP";
// export const currHpName = "FIGHT_PROP_CUR_HP";

export const baseAtkName = "FIGHT_PROP_BASE_ATTACK";
export const flatAtkName = "FIGHT_PROP_ATTACK";
export const atkPercentName = "FIGHT_PROP_ATTACK_PERCENT";
// export const currAtkName = "FIGHT_PROP_CUR_ATTACK";

export const baseDefName = "FIGHT_PROP_BASE_DEFENSE";
export const flatDefName = "FIGHT_PROP_DEFENSE";
export const defPercentName = "FIGHT_PROP_DEFENSE_PERCENT";
// export const currDefName = "FIGHT_PROP_CUR_DEFENSE";

export const baseMvmtSpdName = "FIGHT_PROP_BASE_SPEED";
export const mvmtSpdPercentName = "FIGHT_PROP_SPEED_PERCENT";
// export const currMvmtSpd = "FIGHT_PROP_CUR_SPEED";

export const critRateName = "FIGHT_PROP_CRITICAL";
export const critResName = "FIGHT_PROP_ANTI_CRITICAL";
export const critDmgName = "FIGHT_PROP_CRITICAL_HURT";

export const emName = "FIGHT_PROP_ELEMENT_MASTERY";

export const erName = "FIGHT_PROP_CHARGE_EFFICIENCY";

export const dmgBonusName = "FIGHT_PROP_ADD_HURT";
export const dmgReductionName = "FIGHT_PROP_SUB_HURT";

export const outgoingHealingBonusName = "FIGHT_PROP_HEAL_ADD";
export const incomingHealingBonusName = "FIGHT_PROP_HEALED_ADD";

export const pyroDmgBonusName = "FIGHT_PROP_FIRE_ADD_HURT";
export const pyroResName = "FIGHT_PROP_FIRE_SUB_HURT";

export const hydroDmgBonusName = "FIGHT_PROP_WATER_ADD_HURT";
export const hydroResName = "FIGHT_PROP_WATER_SUB_HURT";

export const dendroDmgBonusName = "FIGHT_PROP_GRASS_ADD_HURT";
export const dendroResName = "FIGHT_PROP_GRASS_SUB_HURT";

export const electroDmgBonusName = "FIGHT_PROP_ELEC_ADD_HURT";
export const electroResName = "FIGHT_PROP_ELEC_SUB_HURT";

export const cryoDmgBonusName = "FIGHT_PROP_ICE_ADD_HURT";
export const cryoResName = "FIGHT_PROP_ICE_SUB_HURT";

export const anemoDmgBonusName = "FIGHT_PROP_WIND_ADD_HURT";
export const anemoResName = "FIGHT_PROP_WIND_SUB_HURT";

export const physicalDmgBonusName = "FIGHT_PROP_PHYSICAL_ADD_HURT";
export const physicalResName = "FIGHT_PROP_PHYSICAL_SUB_HURT";

export const geoDmgBonusName = "FIGHT_PROP_ROCK_ADD_HURT";
export const geoResName = "FIGHT_PROP_ROCK_SUB_HURT";

// export const hitName = "FIGHT_PROP_EFFECT_HIT";
// export const resistName = "FIGHT_PROP_EFFECT_RESIST";

export const giFightPropConversionMap = {
  [baseHpName]: "BaseHp",
  [flatHpName]: "FlatHp",
  [hpPercentName]: "HpPercent",
  //  [maxHpName]: "MaxHp",
  //  [currHpName]: "CurrHp",

  [baseAtkName]: "BaseAtk",
  [flatAtkName]: "FlatAtk",
  [atkPercentName]: "AtkPercent",
  //  [currAtkName]: "CurrAtk",

  [baseDefName]: "BaseDef",
  [flatDefName]: "FlatDef",
  [defPercentName]: "DefPercent",
  //  [currDefName]: "CurrDef",

  [baseMvmtSpdName]: "BaseMvmtSpd",
  [mvmtSpdPercentName]: "MvmtSpdPercent",
  // export const currMvmtSpd = "FIGHT_PROP_CUR_SPEED";

  [critRateName]: "CritRate",
  [critResName]: "CritRes",
  [critDmgName]: "CritDmg",

  [emName]: "ElementalMastery",

  [erName]: "EnergyRecharge",

  [dmgBonusName]: "DmgBonus",
  [dmgReductionName]: "DmgReduction",

  [outgoingHealingBonusName]: "OutgoingHealingBonus",
  [incomingHealingBonusName]: "IncomingHealingBonus",

  [pyroDmgBonusName]: "PyroDmgBonus",
  [pyroResName]: "PyroRes",

  [hydroDmgBonusName]: "HydroDmgBonus",
  [hydroResName]: "HydroRes",

  [dendroDmgBonusName]: "DendroDmgBonus",
  [dendroResName]: "DendroRes",

  [electroDmgBonusName]: "ElectroDmgBonus",
  [electroResName]: "ElectroRes",

  [cryoDmgBonusName]: "CryoDmgBonus",
  [cryoResName]: "CryoRes",

  [anemoDmgBonusName]: "AnemoDmgBonus",
  [anemoResName]: "AnemoRes",

  [physicalDmgBonusName]: "PhysicalDmgBonus",
  [physicalResName]: "PhysicalRes",

  [geoDmgBonusName]: "GeoDmgBonus",
  [geoResName]: "GeoRes",
} as const satisfies {
  [key: string]: string;
};

export type GIFightPropInGame = keyof typeof giFightPropConversionMap;
export type GIFightProp = (typeof giFightPropConversionMap)[GIFightPropInGame];

export const translateFightProp = (type: GIFightPropInGame) =>
  giFightPropConversionMap[type];
