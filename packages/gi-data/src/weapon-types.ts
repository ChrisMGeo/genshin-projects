export const giWeaponTypeConversionMap = {
  WEAPON_SWORD_ONE_HAND: "Sword",
  WEAPON_CLAYMORE: "Claymore",
  WEAPON_POLE: "Polearm",
  WEAPON_BOW: "Bow",
  WEAPON_CATALYST: "Catalyst",
} as const satisfies {
  [key: string]: string;
};

export type GIWeaponTypeInGame = keyof typeof giWeaponTypeConversionMap;
export type GIWeaponType =
  (typeof giWeaponTypeConversionMap)[GIWeaponTypeInGame];

export const translateWeaponType = (type: GIWeaponTypeInGame) =>
  giWeaponTypeConversionMap[type];
