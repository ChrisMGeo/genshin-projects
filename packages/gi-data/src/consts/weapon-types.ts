import { capitalizeFirstLetter } from "@repo/utils/capitalize-first-letter";

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
export const getWeaponTypeIcon = (weaponType: GIWeaponType): string => {
  let inGameWeaponType = "";
  switch (weaponType) {
    case "polearm":
      inGameWeaponType = "Pole";
      break;
    default:
      inGameWeaponType = capitalizeFirstLetter(weaponType);
      break;
  }
  return `UI_GachaTypeIcon_${inGameWeaponType}`;
};
