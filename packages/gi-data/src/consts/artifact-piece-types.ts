export const giArtifactPieceTypeConversionMap = {
  EQUIP_BRACER: "Flower",
  EQUIP_NECKLACE: "Feather",
  EQUIP_SHOES: "Sands",
  EQUIP_RING: "Goblet",
  EQUIP_DRESS: "Circlet",
} as const satisfies {
  [key: string]: string;
};

export type GIArtifactPieceTypeInGame =
  keyof typeof giArtifactPieceTypeConversionMap;
export type GIArtifactPieceType =
  (typeof giArtifactPieceTypeConversionMap)[GIArtifactPieceTypeInGame];

export const translateArtifactPieceType = (type: GIArtifactPieceTypeInGame) =>
  giArtifactPieceTypeConversionMap[type];
