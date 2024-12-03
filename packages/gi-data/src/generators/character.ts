import AvatarCodex from "../generated/excel-bin-output/avatar-codex.js";
import AvatarTalent from "../generated/excel-bin-output/avatar-talent.js";
import Avatar from "../generated/excel-bin-output/avatar.js";
import AvatarCurve from "../generated/excel-bin-output/avatar-curve.js";
import AvatarSkill from "../generated/excel-bin-output/avatar-skill.js";
import AvatarSkillDepot from "../generated/excel-bin-output/avatar-skill-depot.js";
import FetterInfo from "../generated/excel-bin-output/fetter-info.js";
import FetterCharacterCard from "../generated/excel-bin-output/fetter-character-card.js";
import Reward from "../generated/excel-bin-output/reward.js";
import Material from "../generated/excel-bin-output/material.js";
import ProudSkill from "../generated/excel-bin-output/proud-skill.js";
import { getTextMap } from "../consts/textmaps.js";
import { pascalize } from "@repo/utils/pascalize";
import {
  GIWeaponType,
  GIWeaponTypeInGame,
  translateWeaponType,
} from "../consts/weapon-types.js";
import { GIVisionType } from "../consts/vision-types.js";

const enTextMap = getTextMap("EN");

export type CharacterInfo = {
  id: string; // Using GOOD format ID's
  avatarId: number; // In Game ID's

  weaponType: GIWeaponType;
  vision: GIVisionType;
  rarity: 4 | 5;

  nameHash: number;
  detailHash: number;
  descHash: number;
  titleHash: number;
  constellationHash: number;

  constellations: ConstellationData[];
  energySkill: SkillData;
  passives: SkillData[];
  skills: SkillData[];

  icon: string;
  sideIcon: string;
  nameCard: string;

  hpInfo: StatInfo;
  atkInfo: StatInfo;
  defInfo: StatInfo;
};

export type ConstellationData = {
  nameHash: number;
  descHash: number;
  icon: string;
};

export type SkillData = {
  nameHash: number;
  descHash: number;
  icon: string;
};

export type StatInfo = {
  initial: number;
  curve: string;
};

export const getCharacterInfos = (): {
  relevantHashes: Set<number>;
  characterInfo: CharacterInfo[];
} => {
  let relevantHashes = new Set<number>();
  let characterInfo: CharacterInfo[] = [];

  for (const { avatarId } of AvatarCodex) {
    const avatar = Avatar.find((a) => a.id === avatarId);
    if (!avatar) continue;
    const {
      nameTextMapHash: nameHash,
      descTextMapHash: descHash,
      iconName: icon,
      sideIconName: sideIcon,
      skillDepotId,
      qualityType,
      weaponType: _weaponType,
      hpBase,
      defenseBase,
      attackBase,
      propGrowCurves,
    } = avatar;

    relevantHashes.add(nameHash);
    relevantHashes.add(descHash);

    const rarity = qualityType === "QUALITY_PURPLE" ? 4 : 5;

    const weaponType = translateWeaponType(_weaponType as GIWeaponTypeInGame);

    const enName = enTextMap[nameHash];
    if (!enName) continue;

    const id = pascalize(enName);

    const skillDepot = AvatarSkillDepot.find((d) => d.id === skillDepotId);

    let constellations: ConstellationData[] = [];

    let skills: SkillData[] = [];
    let energySkill: SkillData | undefined = undefined;
    let passives: SkillData[] = [];

    const fetter = FetterInfo.find((f) => f.avatarId === avatarId);

    if (id === "Traveler") {
      // TODO: Implement traveler logic
      continue;
    }

    if (!fetter) continue;

    const {
      avatarVisionBeforTextMapHash,
      avatarConstellationBeforTextMapHash: constellationHash,
    } = fetter;

    relevantHashes.add(avatarVisionBeforTextMapHash);
    relevantHashes.add(constellationHash);

    const vision = enTextMap[avatarVisionBeforTextMapHash]! as GIVisionType;

    let nameCard = "";

    const fetterCharacterCard = FetterCharacterCard.find(
      (f) => f.avatarId === avatarId
    );
    if (fetterCharacterCard) {
      const { rewardId } = fetterCharacterCard;

      const reward = Reward.find((r) => r.rewardId === rewardId);
      if (!reward) continue;
      const { rewardItemList } = reward;

      for (const { itemId } of rewardItemList) {
        const material = Material.find((m) => m.id === itemId);
        if (!material) continue;
        const { picPath } = material;

        const _nameCardIconName = picPath[1];
        if (!_nameCardIconName) continue;
        nameCard = _nameCardIconName;
      }
    }

    const {
      avatarTitleTextMapHash: titleHash,
      avatarDetailTextMapHash: detailHash,
    } = fetter;

    relevantHashes.add(titleHash);
    relevantHashes.add(detailHash);

    if (skillDepot) {
      const {
        talents: talentIds,
        energySkill: energySkillId,
        inherentProudSkillOpens,
        skills: skillIds,
      } = skillDepot;

      for (const talentId of talentIds) {
        const talent = AvatarTalent.find((t) => t.talentId === talentId);
        if (talent) {
          const {
            nameTextMapHash: nameHash,
            descTextMapHash: descHash,
            icon,
          } = talent;

          relevantHashes.add(nameHash);
          relevantHashes.add(descHash);

          constellations.push({ nameHash, descHash, icon });
        }
      }

      const energySkillEntry = AvatarSkill.find((s) => s.id === energySkillId);
      if (energySkillEntry) {
        const {
          nameTextMapHash: nameHash,
          descTextMapHash: descHash,
          skillIcon: icon,
        } = energySkillEntry;

        relevantHashes.add(nameHash);
        relevantHashes.add(descHash);

        energySkill = {
          nameHash,
          descHash,
          icon,
        };
      }

      for (const { proudSkillGroupId } of inherentProudSkillOpens) {
        const passiveEntry = ProudSkill.find(
          (s) => s.proudSkillGroupId === proudSkillGroupId
        );
        if (passiveEntry) {
          const {
            nameTextMapHash: nameHash,
            descTextMapHash: descHash,
            icon,
          } = passiveEntry;
          if (!enTextMap[nameHash]) {
            continue; // doesn't exist. TODO: Find better solution
          }

          relevantHashes.add(nameHash);
          relevantHashes.add(descHash);

          passives.push({ nameHash, descHash, icon });
        }
      }

      for (const skillId of skillIds) {
        const skill = AvatarSkill.find((s) => s.id === skillId);
        if (skill) {
          const {
            nameTextMapHash: nameHash,
            descTextMapHash: descHash,
            skillIcon: icon,
          } = skill;

          relevantHashes.add(nameHash);
          relevantHashes.add(descHash);

          skills.push({ nameHash, descHash, icon });
        }
      }
    }

    const hpInfo: StatInfo = {
      initial: hpBase,
      curve: propGrowCurves.find((c) => c.type === "FIGHT_PROP_BASE_HP")!
        .growCurve,
    };

    const atkInfo: StatInfo = {
      initial: hpBase,
      curve: propGrowCurves.find((c) => c.type === "FIGHT_PROP_BASE_ATTACK")!
        .growCurve,
    };

    const defInfo: StatInfo = {
      initial: hpBase,
      curve: propGrowCurves.find((c) => c.type === "FIGHT_PROP_BASE_DEFENSE")!
        .growCurve,
    };

    characterInfo.push({
      id,
      avatarId,

      rarity,
      weaponType,
      vision,

      nameHash,
      titleHash,
      detailHash,
      descHash,
      constellationHash,

      constellations,
      energySkill: energySkill!,
      skills,
      passives,

      icon,
      sideIcon,
      nameCard,

      hpInfo,
      atkInfo,
      defInfo,
    });
  }
  return {
    relevantHashes,
    characterInfo,
  };
};
