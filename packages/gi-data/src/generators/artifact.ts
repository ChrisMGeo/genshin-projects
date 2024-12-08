import { pascalize } from "@repo/utils/pascalize";
import { getTextMap } from "../consts/textmaps.js";
import EquipAffix from "../generated/excel-bin-output/equip-affix.js";
import ReliquaryCodex from "../generated/excel-bin-output/reliquary-codex.js";
import ReliquarySet from "../generated/excel-bin-output/reliquary-set.js";
import {
  GIArtifactPieceType,
  GIArtifactPieceTypeInGame,
  translateArtifactPieceType,
} from "../consts/artifact-piece-types.js";
import Reliquary from "../generated/excel-bin-output/reliquary.js";

const enTextMap = getTextMap("EN");

export type ArtifactInfo = {
  suitId: number;
  id: string;

  nameHash: number;

  minRarity: number;
  maxRarity: number;

  setBonuses: { [key: number]: SetBonusInfo };
  pieces: { [key in GIArtifactPieceType]?: ArtifactPieceInfo };
};

export type SetBonusInfo = {
  descHash: number;
};

export type ArtifactPieceInfo = {
  nameHash: number;
  descHash: number;
  icon: string;
};

export const getArtifactInfos = (): {
  relevantHashes: Set<number>;
  artifactSetMap: { [key: string]: ArtifactInfo };
} => {
  let relevantHashes = new Set<number>();
  let artifactSetMap: { [key: string]: ArtifactInfo } = {};

  for (const { suitId, level } of ReliquaryCodex) {
    const { setNeedNum, setIcon, equipAffixId, containsList } =
      ReliquarySet.find((s) => s.setId === suitId)!;
    const equipAffixes = EquipAffix.filter((a) => a.id === equipAffixId);
    if (equipAffixes.length === 0) continue;
    const nameHash = equipAffixes[0]!.nameTextMapHash;
    relevantHashes.add(nameHash);
    const enName = enTextMap[nameHash];
    if (!enName) continue;
    const id = pascalize(enName);
    let setBonuses: { [key: number]: SetBonusInfo } = {};
    for (let j = 0; j < equipAffixes.length; j++) {
      const { descTextMapHash: descHash } = equipAffixes[j]!;
      const neededNum = setNeedNum[j]!;
      setBonuses[neededNum] = { descHash };
      relevantHashes.add(descHash);
    }
    let pieces: { [key in GIArtifactPieceType]?: ArtifactPieceInfo } = {};
    for (const artifactId of containsList) {
      const artifact = Reliquary.find((a) => a.id === artifactId);
      if (!artifact) continue;
      const {
        nameTextMapHash: nameHash,
        descTextMapHash: descHash,
        equipType,
        icon,
      } = artifact;
      relevantHashes.add(nameHash);
      relevantHashes.add(descHash);
      const pieceType: GIArtifactPieceType = translateArtifactPieceType(
        equipType as GIArtifactPieceTypeInGame
      );
      pieces[pieceType] = { nameHash, descHash, icon };
    }
    if (artifactSetMap[id]) {
      const old = artifactSetMap[id];
      artifactSetMap[id] = {
        ...old,
        minRarity: Math.min(old.minRarity, level),
        maxRarity: Math.max(old.maxRarity, level),
      };
    } else {
      artifactSetMap[id] = {
        suitId,
        id,
        nameHash,
        minRarity: level,
        maxRarity: level,
        setBonuses,
        pieces,
      };
    }
  }

  return {
    relevantHashes,
    artifactSetMap,
  };
};
