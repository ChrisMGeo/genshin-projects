export const giVisionConversionMap = {
  Pyro: "pyro",
  Hydro: "hydro",
  Cryo: "cryo",
  Electro: "electro",
  Anemo: "anemo",
  Geo: "geo",
  Dendro: "dendro",
  None: "none"
} as const;

export type GIVisionInGame = keyof typeof giVisionConversionMap;

export type GIVision = (typeof giVisionConversionMap)[GIVisionInGame];

export const getVisionIcon = (vision: GIVision): string => {
  let inGameVision = "";
  switch (vision) {
    case "anemo":
      inGameVision = "Wind";
      break;
    case "cryo":
      inGameVision = "Ice";
      break;
    case "dendro":
      inGameVision = "Grass";
      break;
    case "electro":
      inGameVision = "Electric";
      break;
    case "geo":
      inGameVision = "Rock";
      break;
    case "hydro":
      inGameVision = "Water";
      break;
    case "pyro":
      inGameVision = "Fire";
      break;
  }
  return `UI_Buff_Element_${inGameVision}`;
};
