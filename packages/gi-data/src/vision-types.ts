export const giVisionTypes = [
  "Pyro",
  "Hydro",
  "Cryo",
  "Electro",
  "Anemo",
  "Geo",
  "Dendro",
] as const;

export type GIVisionType = (typeof giVisionTypes)[number];
