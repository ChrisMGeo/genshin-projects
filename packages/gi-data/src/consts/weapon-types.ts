export const giWeaponTypeConversionMap = {
  WEAPON_SWORD_ONE_HAND: "sword",
  WEAPON_CLAYMORE: "claymore",
  WEAPON_POLE: "polearm",
  WEAPON_BOW: "bow",
  WEAPON_CATALYST: "catalyst",
} as const satisfies {
  [key: string]: string;
};

export type GIWeaponTypeInGame = keyof typeof giWeaponTypeConversionMap;
export type GIWeaponType =
  (typeof giWeaponTypeConversionMap)[GIWeaponTypeInGame];

export const translateWeaponType = (type: GIWeaponTypeInGame) =>
  giWeaponTypeConversionMap[type];
