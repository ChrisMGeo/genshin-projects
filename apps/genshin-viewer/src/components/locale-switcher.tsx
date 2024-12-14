import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./locale-switcher-select";

type Props = {
  className?: string;
};

export default function LocaleSwitcher({ className }: Props) {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label="label"
      className={className}
    >
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
