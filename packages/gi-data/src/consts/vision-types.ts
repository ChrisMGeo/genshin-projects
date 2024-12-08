export const giVisionConversionMap = {
  Pyro: "pyro",
  Hydro: "hydro",
  Cryo: "cryo",
  Electro: "electro",
  Anemo: "anemo",
  Geo: "geo",
  Dendro: "dendro",
} as const;

export type GIVisionInGame = keyof typeof giVisionConversionMap;

export type GIVision = (typeof giVisionConversionMap)[GIVisionInGame];
