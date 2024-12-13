import { Link } from "@/i18n/routing";
import { characterInfo } from "@repo/gi-data/character-info";
import { CharacterInfo } from "@repo/gi-data/generators/character";
import { useTranslations } from "next-intl";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      {Object.values(characterInfo.characterMap).map((c, i) => (
        <CharacterView character={c} key={i} />
      ))}
    </div>
  );
}
const CharacterView = ({
  character,
}: {
  character: DeepReadonly<CharacterInfo>;
}) => {
  const t = useTranslations();
  const enName = t(`dm.${character.nameHash}`);
  return (
    <Link
      prefetch
      className="flex flex-col items-center"
      href={`/characters/${character.id}`}
    >
      <Image
        src={`https://gi.yatta.moe/assets/UI/${character.icon}.png`}
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
