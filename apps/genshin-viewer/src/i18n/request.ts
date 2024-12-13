import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";
import { getTextMap } from "@repo/gi-data/relevant-textmaps";
import {
  GILanguage,
  giLanguageToUTSMap,
  GIUTSLanguage,
} from "@repo/gi-data/languages";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const validLocale = locale as GIUTSLanguage;

  return {
    locale,
    messages: {
      dm: getTextMap(
        (Object.keys(giLanguageToUTSMap) as GILanguage[]).find(
          (k) => giLanguageToUTSMap[k] === validLocale
        )!
      ),
    },
  };
});
