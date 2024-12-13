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

export const giLanguageToUTSMap = {
  CHS: "zh-CN",
  CHT: "zh-TW",
  DE: "de",
  EN: "en",
  ES: "es",
  FR: "fr",
  ID: "id",
  IT: "it",
  JP: "ja",
  KR: "ko",
  PT: "pt",
  RU: "ru",
  TH: "th",
  TR: "tr",
  VI: "vi",
} as const satisfies {
  [inGameLocale in GILanguage]: string;
};

export const giUTSLanguages = Object.values(giLanguageToUTSMap);

export type GIUTSLanguage = (typeof giLanguageToUTSMap)[GILanguage];
