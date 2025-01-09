"use client";
import {
  artifactPieceTypeIcon,
  GIArtifactPieceType,
} from "@repo/gi-data/artifact-piece-types";
import { ArtifactInfo } from "@repo/gi-data/generators/artifact";
import UnityRichTextComponent from "@repo/unity-richtext-react/component";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import Image from "next/image";
import { useState } from "react";

type ArtifactSetDisplayProps = DeepReadonly<
  Pick<ArtifactInfo, "pieces" | "minRarity" | "maxRarity" | "setBonuses">
>;
const ArtifactSetDisplay = ({
  pieces,
  // minRarity,
  maxRarity,
  setBonuses,
}: ArtifactSetDisplayProps) => {
  const t = useTranslations();
  const rarity = maxRarity;
  // const [rarity, setRarity] = useState(maxRarity);
  const firstPieceType = Object.keys(pieces)[0] as
    | GIArtifactPieceType
    | undefined;
  const [pieceType, setPieceType] = useState<GIArtifactPieceType | undefined>(
    firstPieceType
  );

  return (
    <div>
      <div className="relative flex flex-row rounded-t-lg bg-white h-48 lg:h-56">
        <div className="flex flex-col">
          <div className="flex flex-col pt-4 pl-4">
            {pieceType && (
              <div>
                <div className="flex flex-row gap-2">
                  <span>
                    <Image
                      src={`https://gi.yatta.moe/assets/UI/${artifactPieceTypeIcon(pieceType)}.png`}
                      alt="Piece Type Icon"
                      width="64"
                      height="64"
                      className="h-6 w-6"
                    />
                  </span>
                  <span className="flex items-center rounded-md">
                    {t(`ui.common.artifact.${pieceType}`)}
                  </span>
                </div>
                <div className="text-opacity-70 md:text-lg lg:text-lg xl:text-lg">
                  {pieces[pieceType] && t(`dm.${pieces[pieceType].nameHash}`)}
                </div>
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-row gap-1 pb-4 pl-4">
            {[...Array(rarity)].map((_, i) => (
              <div key={i}>★</div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          {pieceType && pieces[pieceType] && (
            <Image
              src={`https://gi.yatta.moe/assets/UI/reliquary/${pieces[pieceType].icon}.png`}
              alt="Item icon"
              loading="eager"
              height="256"
              width="256"
              className="w-48 lg:w-56"
            />
          )}
        </div>
      </div>
      <div className="rounded-b-2xl bg-white p-4">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              {Object.entries(pieces).map(([piece], i) => {
                return (
                  <span
                    className={clsx(
                      "cursor-pointer rounded-md bg-black p-1.5",
                      pieceType === piece ? "bg-opacity-20" : "bg-opacity-10"
                    )}
                    key={i}
                    onClick={() => setPieceType(piece as GIArtifactPieceType)}
                  >
                    <Image
                      src={`https://gi.yatta.moe/assets/UI/${artifactPieceTypeIcon(piece as GIArtifactPieceType)}.png`}
                      className="h-7 w-7"
                      width="64"
                      height="64"
                      alt="Artifact Piece Type"
                    />
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(setBonuses).map(
                ([_piecesNeeded, bonusInfo], i) => {
                  const piecesNeeded = parseInt(_piecesNeeded);
                  return (
                    <div className="flex flex-row items-center gap-2" key={i}>
                      <div className="flex-shrink-0 font-semibold">
                        {t(`ui.common.artifact.${piecesNeeded}PieceBonus`)}:
                      </div>
                      <div className="whitespace-pre-wrap leading-snug select-text">
                        {t(`dm.${bonusInfo.descHash}`)}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            {pieceType && pieces[pieceType] && (
              <div className="select-text border-t-2 pt-4">
                <UnityRichTextComponent>
                  {t.raw(`dm.${pieces[pieceType].descHash}`)}
                </UnityRichTextComponent>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactSetDisplay;
