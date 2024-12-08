export const giArtifactPieceTypeConversionMap = {
  EQUIP_BRACER: "flower",
  EQUIP_NECKLACE: "plume",
  EQUIP_SHOES: "sands",
  EQUIP_RING: "goblet",
  EQUIP_DRESS: "circlet",
} as const satisfies {
  [key: string]: string;
};

export type GIArtifactPieceTypeInGame =
  keyof typeof giArtifactPieceTypeConversionMap;
export type GIArtifactPieceType =
  (typeof giArtifactPieceTypeConversionMap)[GIArtifactPieceTypeInGame];

export const translateArtifactPieceType = (type: GIArtifactPieceTypeInGame) =>
  giArtifactPieceTypeConversionMap[type];
