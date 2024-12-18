import { use } from "react";
import { weaponInfo, WeaponKey } from "@repo/gi-data/weapon-info";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import WeaponDisplay from "@/components/weapon-display";

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
                  <WeaponDisplay
                    atkInfo={weapon.atkInfo}
                    promoteId={weapon.promoteId}
                    rarity={weapon.rarity}
                    refinementInfo={weapon.refinementInfo}
                    weaponType={weapon.weaponType}
                    icon={weapon.icon}
                    descHash={weapon.descHash}
                  />
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
