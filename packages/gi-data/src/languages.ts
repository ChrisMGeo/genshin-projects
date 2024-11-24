export const giLanguages = [
  "CHS",
  "CHT",
  "DE",
  "EN",
  "ES",
  "FR",
  "ID",
  "IT",
  "JP",
  "KR",
  "PT",
  "RU",
  "TH",
  "TR",
  "VI",
] as const;

export type GILanguage = (typeof giLanguages)[number];
