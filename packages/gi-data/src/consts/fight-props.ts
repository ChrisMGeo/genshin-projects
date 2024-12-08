export const baseHp = {
  inGameId: "FIGHT_PROP_BASE_HP",
  translated: "hp",
} as const;
export const flatHp = { inGameId: "FIGHT_PROP_HP", translated: "hp" } as const;
export const hpPercent = {
  inGameId: "FIGHT_PROP_HP_PERCENT",
  translated: "hp_",
} as const;
// export const maxHp = { inGameId: "FIGHT_PROP_MAX_HP", translated: "" } as const;
// export const currHp = { inGameId: "FIGHT_PROP_CUR_HP", translated: "" } as const;

export const baseAtk = {
  inGameId: "FIGHT_PROP_BASE_ATTACK",
  translated: "atk",
} as const;
export const flatAtk = {
  inGameId: "FIGHT_PROP_ATTACK",
  translated: "atk",
} as const;
export const atkPercent = {
  inGameId: "FIGHT_PROP_ATTACK_PERCENT",
  translated: "atk_",
} as const;
// export const currAtk = { inGameId: "FIGHT_PROP_CUR_ATTACK", translated: "" } as const;

export const baseDef = {
  inGameId: "FIGHT_PROP_BASE_DEFENSE",
  translated: "def",
} as const;
export const flatDef = {
  inGameId: "FIGHT_PROP_DEFENSE",
  translated: "def",
} as const;
export const defPercent = {
  inGameId: "FIGHT_PROP_DEFENSE_PERCENT",
  translated: "def_",
} as const;
// export const currDef = { inGameId: "FIGHT_PROP_CUR_DEFENSE", translated: "" } as const;

export const baseMvmtSpd = {
  inGameId: "FIGHT_PROP_BASE_SPEED",
  translated: "",
} as const;
export const mvmtSpdPercent = {
  inGameId: "FIGHT_PROP_SPEED_PERCENT",
  translated: "",
} as const;
// export const currMvmtSpd = "FIGHT_PROP_CUR_SPEED";

export const critRate = {
  inGameId: "FIGHT_PROP_CRITICAL",
  translated: "critRate_",
} as const;
export const critRes = {
  inGameId: "FIGHT_PROP_ANTI_CRITICAL",
  translated: "",
} as const;
export const critDmg = {
  inGameId: "FIGHT_PROP_CRITICAL_HURT",
  translated: "critDMG_",
} as const;

export const em = {
  inGameId: "FIGHT_PROP_ELEMENT_MASTERY",
  translated: "eleMas",
} as const;

export const er = {
  inGameId: "FIGHT_PROP_CHARGE_EFFICIENCY",
  translated: "enerRech_",
} as const;

export const dmgBonus = {
  inGameId: "FIGHT_PROP_ADD_HURT",
  translated: "dmg_",
} as const;
export const dmgReduction = {
  inGameId: "FIGHT_PROP_SUB_HURT",
  translated: "",
} as const;

export const outgoingHealingBonus = {
  inGameId: "FIGHT_PROP_HEAL_ADD",
  translated: "heal_",
} as const;
export const incomingHealingBonus = {
  inGameId: "FIGHT_PROP_HEALED_ADD",
  translated: "",
} as const;

export const pyroDmgBonus = {
  inGameId: "FIGHT_PROP_FIRE_ADD_HURT",
  translated: "pyro_dmg_",
} as const;
export const pyroRes = {
  inGameId: "FIGHT_PROP_FIRE_SUB_HURT",
  translated: "",
} as const;

export const hydroDmgBonus = {
  inGameId: "FIGHT_PROP_WATER_ADD_HURT",
  translated: "hydro_dmg_",
} as const;
export const hydroRes = {
  inGameId: "FIGHT_PROP_WATER_SUB_HURT",
  translated: "",
} as const;

export const dendroDmgBonus = {
  inGameId: "FIGHT_PROP_GRASS_ADD_HURT",
  translated: "dendro_dmg_",
} as const;
export const dendroRes = {
  inGameId: "FIGHT_PROP_GRASS_SUB_HURT",
  translated: "",
} as const;

export const electroDmgBonus = {
  inGameId: "FIGHT_PROP_ELEC_ADD_HURT",
  translated: "electro_dmg_",
} as const;
export const electroRes = {
  inGameId: "FIGHT_PROP_ELEC_SUB_HURT",
  translated: "",
} as const;

export const cryoDmgBonus = {
  inGameId: "FIGHT_PROP_ICE_ADD_HURT",
  translated: "cryo_dmg_",
} as const;
export const cryoRes = {
  inGameId: "FIGHT_PROP_ICE_SUB_HURT",
  translated: "",
} as const;

export const anemoDmgBonus = {
  inGameId: "FIGHT_PROP_WIND_ADD_HURT",
  translated: "anemo_dmg_",
} as const;
export const anemoRes = {
  inGameId: "FIGHT_PROP_WIND_SUB_HURT",
  translated: "",
} as const;

export const physicalDmgBonus = {
  inGameId: "FIGHT_PROP_PHYSICAL_ADD_HURT",
  translated: "physical_dmg_",
} as const;
export const physicalRes = {
  inGameId: "FIGHT_PROP_PHYSICAL_SUB_HURT",
  translated: "",
} as const;

export const geoDmgBonus = {
  inGameId: "FIGHT_PROP_ROCK_ADD_HURT",
  translated: "geo_dmg_",
} as const;
export const geoRes = {
  inGameId: "FIGHT_PROP_ROCK_SUB_HURT",
  translated: "",
} as const;

// export const hit = { inGameId: "FIGHT_PROP_EFFECT_HIT", translated: "" } as const;
// export const resist = { inGameId: "FIGHT_PROP_EFFECT_RESIST", translated: "" } as const;

export const shieldStrength = {
  inGameId: "FIGHT_PROP_SHIELD_COST_MINUS_RATIO",
  translated: "shield_",
} as const;

// copy above lines, replace the lines inside this object with it
// and use the following neovim regex on the newly pasted text (using visual mode):
// '<,'>s/export const \(.*\)Name = .*/  \[\1Name\]: "\u\1",
//        ^ where u start typing
// after doing so, might need to change some names to match previous version: always em and er
export const giFightPropConversionMap = {
  [baseHp.inGameId]: baseHp.translated,
  [flatHp.inGameId]: flatHp.translated,
  [hpPercent.inGameId]: hpPercent.translated,
  // [maxHp.inGameId]: maxHp.translated,
  // [currHp.inGameId]: currHp.translated,

  [baseAtk.inGameId]: baseAtk.translated,
  [flatAtk.inGameId]: flatAtk.translated,
  [atkPercent.inGameId]: atkPercent.translated,
  // [currAtk.inGameId]: currAtk.translated,

  [baseDef.inGameId]: baseDef.translated,
  [flatDef.inGameId]: flatDef.translated,
  [defPercent.inGameId]: defPercent.translated,
  // [currDef.inGameId]: currDef.translated,

  [baseMvmtSpd.inGameId]: baseMvmtSpd.translated,
  [mvmtSpdPercent.inGameId]: mvmtSpdPercent.translated,
  // export const currMvmtSpd = "FIGHT_PROP_CUR_SPEED";

  [critRate.inGameId]: critRate.translated,
  [critRes.inGameId]: critRes.translated,
  [critDmg.inGameId]: critDmg.translated,

  [em.inGameId]: em.translated,

  [er.inGameId]: er.translated,

  [dmgBonus.inGameId]: dmgBonus.translated,
  [dmgReduction.inGameId]: dmgReduction.translated,

  [outgoingHealingBonus.inGameId]: outgoingHealingBonus.translated,
  [incomingHealingBonus.inGameId]: incomingHealingBonus.translated,

  [pyroDmgBonus.inGameId]: pyroDmgBonus.translated,
  [pyroRes.inGameId]: pyroRes.translated,

  [hydroDmgBonus.inGameId]: hydroDmgBonus.translated,
  [hydroRes.inGameId]: hydroRes.translated,

  [dendroDmgBonus.inGameId]: dendroDmgBonus.translated,
  [dendroRes.inGameId]: dendroRes.translated,

  [electroDmgBonus.inGameId]: electroDmgBonus.translated,
  [electroRes.inGameId]: electroRes.translated,

  [cryoDmgBonus.inGameId]: cryoDmgBonus.translated,
  [cryoRes.inGameId]: cryoRes.translated,

  [anemoDmgBonus.inGameId]: anemoDmgBonus.translated,
  [anemoRes.inGameId]: anemoRes.translated,

  [physicalDmgBonus.inGameId]: physicalDmgBonus.translated,
  [physicalRes.inGameId]: physicalRes.translated,

  [geoDmgBonus.inGameId]: geoDmgBonus.translated,
  [geoRes.inGameId]: geoRes.translated,

  // [hit.inGameId]: hit.translated,
  // [resist.inGameId]: resist.translated,

  [shieldStrength.inGameId]: shieldStrength.translated,
} as const satisfies {
  [key: string]: string;
};

export type GIFightPropInGame = keyof typeof giFightPropConversionMap;
export type GIFightProp = (typeof giFightPropConversionMap)[GIFightPropInGame];

export const translateFightProp = (type: GIFightPropInGame) =>
  giFightPropConversionMap[type];
