import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";
import UnityRichTextComponent from "@repo/unity-richtext-react/component";

const CharacterViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const t = useTranslations();
  const { id: _id } = use(params);
  const id = _id as CharacterKey;
  const character = characterInfo.characterMap[id];
  return (
    <div className="mx-2.5 md:mx-0 lg:mx-0 xl:mx-0 rounded-2xl xl:mt-0 col-span-full xl:col-start-3">
      <div>
        <h2 className="mb-2 text-3xl">
          {t("ui.common.character.constellation.plural")}
        </h2>
        <div className="grid gap-4 lg:col-start-1 lg:grid-cols-2 xl:col-span-6 xl:grid-cols-3">
          {character.constellations.map((c, i) => (
            <div key={i} className="relative flex flex-col">
              <div className="flex flex-row items-center rounded-t-2xl border-t-2 border-b-4 border-l-2 border-r-2 bg-white md:mx-0 lg:col-span-2 lg:mx-0 xl:mx-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <div className="flex flex-row items-center gap-4 px-4 py-2 w-full">
                    <Image
                      loading="eager"
                      src={`https://gi.yatta.moe/assets/UI/${c.icon}.png`}
                      alt="Skill Icon"
                      className="h-14 w-14 flex-shrink-0 rounded-full border-2 bg-black"
                      width="52"
                      height="52"
                    />
                    <div className="mr-auto lg:text-lgxl:text-xl">
                      {i + 1}. {t(`dm.${c.nameHash}`)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col gap-4 rounded-b-2xl border-r-2 border-l-2 border-b-2 bg-white p-4 md:mx-0 lg:mx-0 xl:mx-0">
                <div className="grid gap-4 lg:gap-2">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                      <div className="leading-relaxed lg:leading-block xl:leading-block text-sm select-text">
                        <UnityRichTextComponent>
                          {t.raw(`dm.${c.descHash}`).split("\\n").join("\n")}
                        </UnityRichTextComponent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 xl:hidden"></div>
    </div>
  );
};

export default CharacterViewPage;
