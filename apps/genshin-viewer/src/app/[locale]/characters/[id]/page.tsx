"use client";
import CharacterStatsDisplay from "@/components/character-stats-display";
import { redirect } from "@/i18n/routing";
import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";

const CharacterViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const locale = useLocale();
  const { id: _id } = use(params);
  if (!Object.keys(characterInfo.characterMap).includes(_id)) {
    redirect({
      href: "/characters",
      locale,
    });
  }
  const id = _id as CharacterKey;
  const character = characterInfo.characterMap[id];
  const t = useTranslations();
  const enName = t(`dm.${character.nameHash}`); //enTextMap[character.nameHash];
  return (
    <div className="flex flex-col items-center min-w-192">
      <Image
        src={`https://gi.yatta.moe/assets/UI/${character.icon}.png`}
        height="128"
        width="128"
        alt={`Character Icon for ${enName}.`}
      />
      <div className="flex flex-col">
        <h1>{enName}</h1>
        <CharacterStatsDisplay
          atkInfo={character.atkInfo}
          defInfo={character.defInfo}
          hpInfo={character.hpInfo}
          promoteId={character.promoteId}
        />
      </div>
    </div>
  );
};

export default CharacterViewPage;
