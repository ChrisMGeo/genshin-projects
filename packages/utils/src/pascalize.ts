import { capitalizeFirstLetter } from "./capitalize-first-letter.js";

export const pascalize = (str: string): string => {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c?.match(/[a-zA-Z0-9 ]/i)) {
      res += c;
    } else {
      res += " ";
    }
  }
  res = res
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join("");
  return res;
};
