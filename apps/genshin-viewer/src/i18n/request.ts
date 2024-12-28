import { getRequestConfig } from "next-intl/server";
import { getTextMap } from "@repo/gi-data/relevant-textmaps";
import {
  GILanguage,
  giLanguageToUTSMap,
  GIUTSLanguage,
} from "@repo/gi-data/languages";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const res = cookieStore.get("NEXT_LOCALE");
  const locale: GIUTSLanguage = res
    ? [...(Object.values(giLanguageToUTSMap) as string[])].includes(res.value)
      ? (res.value as GIUTSLanguage)
      : "en"
    : "en";

  return {
    locale,
    messages: {
      ui: (await import(`../../messages/${locale}.json`)).default,
      dm: getTextMap(
        (Object.keys(giLanguageToUTSMap) as GILanguage[]).find(
          (k) => giLanguageToUTSMap[k] === locale
        )!
      ),
    },
  };
});
