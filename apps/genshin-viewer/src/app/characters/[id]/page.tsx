import CharacterStatsDisplay from "@/components/character-stats-display";
import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";
import { use } from "react";

const CharacterViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: _id } = use(params);
  const id = _id as CharacterKey;
  const character = characterInfo.characterMap[id];
  return (
    <div className="mx-2.5 md:mx-0 lg:mx-0 xl:mx-0 rounded-2xl xl:mt-0 col-span-full xl:col-start-6">
      <div>
        <div className="rounded-2xl border-2 p-4 bg-white">
          <div>
            <CharacterStatsDisplay
              atkInfo={character.atkInfo}
              defInfo={character.defInfo}
              hpInfo={character.hpInfo}
              promoteId={character.promoteId}
              constellationHash={character.constellationHash}
              vision={character.vision}
              weaponType={character.weaponType}
              descHash={character.descHash}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="items-center flex flex-col justify-center"></div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 xl:hidden"></div>
    </div>
  );
};

export default CharacterViewPage;
