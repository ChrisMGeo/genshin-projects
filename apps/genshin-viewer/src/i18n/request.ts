import { getRequestConfig } from "next-intl/server";
import { getTextMap } from "@repo/gi-data/relevant-textmaps";
import {
  GILanguage,
  giLanguageToUTSMap,
  GIUTSLanguage,
} from "@repo/gi-data/languages";

export default getRequestConfig(async () => {
  // This typically corresponds to the `[locale]` segment
  const locale = "en";

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
