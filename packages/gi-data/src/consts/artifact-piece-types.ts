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

export const artifactPieceTypeIcon = (type: GIArtifactPieceType): string => {
  switch (type) {
    case "flower":
      return "UI_Icon_Equip_Bracer";
    case "plume":
      return "UI_Icon_Equip_Necklace";
    case "sands":
      return "UI_Icon_Equip_Shoes";
    case "goblet":
      return "UI_Icon_Equip_Ring";
    case "circlet":
      return "UI_Icon_Equip_Dress";
  }
};
