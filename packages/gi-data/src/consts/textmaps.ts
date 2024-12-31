import { GILanguage, giLanguages } from "./languages.js";
import { readDMJSON } from "../util.js";
import { GIDeviceType, giDeviceTypes } from "./device-types.js";
import { GITravelerGender } from "./traveler-gender.js";

export type GITextMap = { [key: string]: string };

// which languages have been split into parts and how many
export const giTextMapSplits: { [key in GILanguage]?: number } = {
  TH: 2,
};

const getTextMapPath = (lang: GILanguage, num?: number) => {
  if (num) return `TextMap/TextMap${lang}_${num}.json`;
  else return `TextMap/TextMap${lang}.json`;
};

export const getTextMap = (lang: GILanguage) => {
  const splitEntry = giTextMapSplits[lang];
  let res: GITextMap = {};
  if (splitEntry) {
    for (let i = 1; i <= splitEntry; i++) {
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

export type GISimplifiedDynamicVariables = {
  travelerGender: GITravelerGender;
  travelerNickname: string;
  device: GIDeviceType;
};

export const defaultOptions: GISimplifiedDynamicVariables = {
  travelerGender: "M",
  travelerNickname: "Traveler",
  device: "PC",
};

export const generateVariableMapFromOptions = (
  options: GISimplifiedDynamicVariables
): Record<string, any> => {
  let res: Record<string, any> = {};
  // gender logic
  const maleBooleans = ["M", "m", "cm"]; // "m" is a mistake I suppose as it only appears once where a "M" should logically be
  const femaleBooleans = ["F", "cf"];
  let genderBooleans =
    options.travelerGender === "M" ? maleBooleans : femaleBooleans;
  let oppositeGenderBooleans =
    options.travelerGender === "M" ? femaleBooleans : maleBooleans;
  for (const varName of genderBooleans) {
    res[varName] = true;
  }
  for (const varName of oppositeGenderBooleans) {
    res[varName] = false;
  }
  // nickname logic
  res["NICKNAME"] = options.travelerNickname;
  // device logic
  giDeviceTypes.forEach((deviceType) => {
    res[`LAYOUT_${deviceType}`] = deviceType === options.device;
  });
  // other consts
  res["SPACE"] = " ";
  res["NON_BREAK_SPACE"] = "\u00A0";
  return res;
};

export const translateDynamicText = (
  textMapString: string,
  options?: Partial<GISimplifiedDynamicVariables>,
  overrides?: Record<string, any>
): string => {
  if (!textMapString.startsWith("#"))
    textMapString = textMapString.substring(1);
  const finalOptions = { ...defaultOptions, ...options };
  const variableMap = {
    ...generateVariableMapFromOptions(finalOptions),
    ...overrides,
  };
  return recursiveReplace(textMapString.substring(1), variableMap);
};

const recursiveReplace = (
  str: string,
  variableMap: Record<string, any>
): string => {
  const initial = str;
  let depth = 0;
  let currentSpan: { start: number; end: number } | undefined = undefined;
  for (let i = 0; i < str.length; i++) {
    const c = str[i]!;
    if (c === "{") {
      depth++;
      if (depth === 1) {
        currentSpan = { start: i, end: i };
      } else {
        currentSpan!.end++;
      }
    } else if (c === "}") {
      depth--;
      currentSpan!.end++;
      if (depth === 0) {
        const substr = str.substring(currentSpan!.start, currentSpan!.end + 1);
        const dynamicContent = substr.slice(1, -1);
        const hashMatch = dynamicContent.match(/^([A-Za-z0-9_]*?)#(.*)/);
        const displayMatch = dynamicContent.match(
          /^([A-Za-z0-9_]*?)(:(D2|F1|F1P|I|F2|F2P|P))?/
        );
        if (hashMatch) {
          const [_, _variable, _toShow] = hashMatch;
          const variable = _variable!;
          const toShow = _toShow!;
          const variableExists = variableMap[variable];
          if (variableExists !== undefined) {
            if (typeof variableExists === "boolean") {
              const replaced = variableExists ? toShow : "";
              str =
                str.substring(0, currentSpan!.start) +
                replaced +
                str.substring(currentSpan!.end + 1);
              i = currentSpan!.start + replaced.length;
            } else {
              // TODO: The PLATFORM#[...]....#[...]... shenanigans
            }
          }
        } else if (displayMatch) {
          // TODO: {name} and {name:format}
        }
      }
    } else if (depth > 0) {
      currentSpan!.end++;
    }
  }
  if (initial === str) return str;
  else return recursiveReplace(str, variableMap);
};
