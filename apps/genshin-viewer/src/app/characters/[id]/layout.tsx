import Link from "next/link";
import { redirect } from "next/navigation";
import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";
import { useTranslations } from "next-intl";
import { use } from "react";
import Image from "next/image";
import BlurringBackground from "@/components/page-helpers/blurring-bg";

export function generateStaticParams() {
  return (Object.keys(characterInfo.characterMap) as CharacterKey[]).map(
    (id) => ({ id })
  );
}

export default function CharacterPageLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id: _id } = use(params);
  if (!Object.keys(characterInfo.characterMap).includes(_id)) {
    redirect("/characters");
  }
  const id = _id as CharacterKey;
  const baseLink = `/characters/${id}`;
  const character = characterInfo.characterMap[id];
  const t = useTranslations();
  const name = t(`dm.${character.nameHash}`); //enTextMap[character.nameHash];
  const title = t(`dm.${character.titleHash}`);
  const characterLinks: { title: string; href: string }[] = [
    { title: "Profile", href: `${baseLink}` },
    { title: "Talent", href: `${baseLink}/talent` },
    { title: "Constellation", href: `${baseLink}/constellation` },
  ];
  return (
    <main className="min-h-screen py-8 md:pr-5 md:pl-28 lg:py-14 lg:pl-32 lg:pr-8">
      <div className="flex flex-col flex-wrap justify-center">
        <BlurringBackground
          id={character.id}
          splashUrl={`https://gi.yatta.moe/assets/UI/${character.icon.replace("AvatarIcon", "Gacha_AvatarImg")}.sm.png`}
        ></BlurringBackground>
        <div className="grid grid-cols-none gap-4 lg:grid-cols-4 xl:grid-cols-8">
          <div className="grid-col grid gap-4 md:gap-2 lg:col-span-full lg:flex lg:flex-col lg:gap-2 xl:sticky xl:top-14 xl:col-span-2 xl:flex xl:h-windowed xl:flex-col xl:gap-2">
            <div className="after:h-full after:w-full after:content-[''] after:absolute bottom-10 -z-1 mb-64 -mt-24 block object-contain md:hidden lg:hidden xl:hidden">
              <Image
                src={`https://gi.yatta.moe/assets/UI/${character.icon.replace("AvatarIcon", "Gacha_AvatarImg")}.png`}
                height={2048}
                width={1024}
                loading="eager"
                alt="Top Background"
                className="absolute object-cover w-auto h-[560px]"
              />
            </div>
            <div className="mx-2.5 flex flex-col rounded-2xl border-2 py-2 pl-4 md:mx-0 xl:mx-0 xl:-ml-36 xl:pl-36 bg-white">
              <div className="flex flex-col">
                <h1 className="text-2xl xl:text-3xl">{name}</h1>
                <h2 className="text-lg xl:text-xl">{title}</h2>
                <div className="mt-auto flex flex-row gap-1">
                  {[...Array(character.rarity)].map((_, i) => (
                    <div key={i}>★</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-2.5 flex overflow-x-auto rounded-2xl border-2 p-2 md:mx-0 lg:mx-0 lg:flex-col xl:mx-0 xl:gap-0 xl:overflow-x-visible bg-white">
              {characterLinks.map((l, i) => (
                <Link
                  href={l.href}
                  key={i}
                  className="text-opacity-100 whitespace-nowrap rounded-lg px-4 text-left text-xl flex-shrink-0 cursor-pointer select-none py-1 transition duration-300 ease-out hover:text-opacity-100"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
