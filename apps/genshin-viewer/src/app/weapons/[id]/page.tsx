import { use } from "react";
import { weaponInfo, WeaponKey } from "@repo/gi-data/weapon-info";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@repo/utils/capitalize-first-letter";
import Image from "next/image";
import { useTranslations } from "next-intl";
import UnityRichTextComponent from "@repo/unity-richtext-react/component";

const WeaponViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: _id } = use(params);
  if (!Object.keys(weaponInfo.weaponMap).includes(_id)) {
    redirect("/characters");
  }
  const id = _id as WeaponKey;
  const weapon = weaponInfo.weaponMap[id];
  const t = useTranslations();
  return (
    <main className="min-h-screen py-8 md:pr-5 md:pl-28 lg:py-14 lg:pl-32 lg:pr-8">
      <div className="flex flex-col flex-wrap justify-center">
        <div className="mx-2.5 grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-1 lg:mx-0 lg:grid-cols-1 xl:mx-0 xl:grid-cols-2">
          <div>
            <h1 className="my-2 text-3xl lg:mx-0 xl:mx-0">
              {t(`dm.${weapon.nameHash}`)}
            </h1>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border-2 bg-white lg:col-span-1 xl:col-span-1 xl:p-4">
                <div className="mx-0 justify-center">
                  <div>
                    <div className="relative flex flex-row rounded-t-lg bg-white h-48 lg:h-56">
                      <div className="flex flex-col">
                        <div className="flex flex-col pt-4 pl-4">
                          <div>
                            <div className="text-lg">
                              {capitalizeFirstLetter(weapon.weaponType)}
                            </div>
                            <div>
                              <div className="text-opacity-70 md:text-lg lg:text-lg xl:text-xl">
                                Base ATK
                              </div>
                              <div className="text-xl lg:text-2xl xl:text-3xl">
                                {weapon.atkInfo.initial}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto flex flex-row gap-1 pb-4 pl-4">
                          {[...Array(weapon.rarity)].map((_, i) => (
                            <div key={i}>★</div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0">
                        <Image
                          src={`https://gi.yatta.moe/assets/UI/${weapon.icon}.png`}
                          alt="Item icon"
                          loading="eager"
                          height="256"
                          width="256"
                          className="w-48 lg:w-56"
                        />
                      </div>
                    </div>
                    <div className="rounded-b-2xl bg-white p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-6 font-semibold">
                          <div className="flex select-none flex-row gap-2">
                            <div className="flex w-20 flex-shrink-0 cursor-pointer flex-row items-center gap-2 rounded-l-md rounded-r-2xl text-xl">
                              Lv. 1
                            </div>
                          </div>
                          <input
                            type="range"
                            className="slider-star my-2 w-full"
                            min="0"
                            max="6"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row items-center gap-4">
                            <select className="flex rounded-md px-1 text-center text-2xl">
                              <option value="0">1</option>
                            </select>
                          </div>
                          <div>
                            <div>
                              {weapon.refinementInfo[0] && (
                                <>
                                  <div className="text-lg">
                                    {weapon.refinementInfo[0]
                                      ? t(
                                          `dm.${weapon.refinementInfo[0].nameHash}`
                                        )
                                      : ""}
                                  </div>
                                  <div className="font-bold select-text">
                                    <UnityRichTextComponent>
                                      {t
                                        .raw(
                                          `dm.${weapon.refinementInfo[0].descHash}`
                                        )
                                        .split("\\n")
                                        .join("\n")}
                                    </UnityRichTextComponent>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full border-2"></div>
                        <div className="select-text">
                          <UnityRichTextComponent>
                            {t.raw(`dm.${weapon.descHash}`)}
                          </UnityRichTextComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default WeaponViewPage;
