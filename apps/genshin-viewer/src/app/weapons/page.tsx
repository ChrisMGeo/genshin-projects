import Link from "next/link";
import { weaponInfo } from "@repo/gi-data/weapon-info";
import { WeaponInfo } from "@repo/gi-data/generators/weapon";
import { useTranslations } from "next-intl";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      {Object.values(weaponInfo.weaponMap).map((w, i) => (
        <WeaponView weapon={w} key={i} />
      ))}
    </div>
  );
}
const WeaponView = ({ weapon }: { weapon: DeepReadonly<WeaponInfo> }) => {
  const t = useTranslations();
  const enName = t(`dm.${weapon.nameHash}`);
  return (
    <Link
      prefetch
      className="flex flex-col items-center"
      href={`/weapons/${weapon.id}`}
    >
      <Image
        src={`https://gi.yatta.moe/assets/UI/${weapon.icon}.png`}
        height="128"
        width="128"
        alt={`Character Icon for ${enName}.`}
      />
      <div className="flex flex-col">
        <h1>{enName}</h1>
      </div>
    </Link>
  );
};
