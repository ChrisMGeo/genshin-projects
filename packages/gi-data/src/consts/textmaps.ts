import { GILanguage, giLanguages } from "./languages.js";
import { readDMJSON } from "../util.js";

export type GITextMap = { [key: string]: string };

// which languages have been split into parts and how many
export const giTextMapSplits: { [key in GILanguage]?: number } = {
  TH: 2,
};

const getTextMapPath = (lang: GILanguage, num?: number) => {
  if (num !== undefined) return `TextMap/TextMap${lang}_${num}.json`;
  else return `TextMap/TextMap${lang}.json`;
};

export const getTextMap = (lang: GILanguage) => {
  const splitEntry = giTextMapSplits[lang];
  let res: GITextMap = {};
  if (splitEntry) {
    for (let i = 0; i < splitEntry; i++) {
      const textMapPath = getTextMapPath(lang, i);
      res = { ...res, ...JSON.parse(readDMJSON(textMapPath)) };
    }
  } else {
    const textMapPath = getTextMapPath(lang);
    res = JSON.parse(readDMJSON(textMapPath));
  }
  return res;
};

export const giTextMaps: Record<GILanguage, GITextMap> = Object.fromEntries(
  giLanguages.map((lang) => [lang, getTextMap(lang)])
) as Record<GILanguage, GITextMap>;
