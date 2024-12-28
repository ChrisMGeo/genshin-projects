import Link from "next/link";
import { artifactInfo } from "@repo/gi-data/artifact-info";
import { ArtifactInfo } from "@repo/gi-data/generators/artifact";
import { useTranslations } from "next-intl";
import { DeepReadonly } from "next/dist/shared/lib/deep-readonly";
import Image from "next/image";
import { GIArtifactPieceType } from "@repo/gi-data/artifact-piece-types";
export default function Home() {
  return (
    <div>
      {Object.values(artifactInfo.artifactSetMap).map((w, i) => (
        <ArtifactSetView artifact={w} key={i} />
      ))}
    </div>
  );
}
const ArtifactSetView = ({
  artifact,
}: {
  artifact: DeepReadonly<ArtifactInfo>;
}) => {
  const t = useTranslations();
  const enName = t(`dm.${artifact.nameHash}`);
  const displayPieceType: GIArtifactPieceType | undefined = (
    ["flower", "plume", "sands", "goblet", "circlet"] as GIArtifactPieceType[]
  ).find((pieceType) => artifact.pieces[pieceType] !== undefined);
  return (
    <Link
      prefetch
      className="flex flex-col items-center"
      href={`/artifacts/${artifact.id}`}
    >
      {displayPieceType && artifact.pieces[displayPieceType] && (
        <Image
          src={`https://gi.yatta.moe/assets/UI/reliquary/${artifact.pieces[displayPieceType].icon}.png`}
          height="128"
          width="128"
          alt={`Character Icon for ${enName}.`}
        />
      )}

      <div className="flex flex-col">
        <h1>{enName}</h1>
      </div>
    </Link>
  );
};
