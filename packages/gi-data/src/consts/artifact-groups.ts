import { ArtifactSetKey } from "../generated/artifact-info.js";

export const artifactGroups = [
  {
    id: "18-atk",
    name: "18% ATK",
    sets: [
      "BraveHeart",
      "EchoesOfAnOffering",
      "FragmentOfHarmonicWhimsy",
      "GladiatorsFinale",
      "ShimenawasReminiscence",
      "NighttimeWhispersInTheEchoingWoods",
      "ResolutionOfSojourner",
      "UnfinishedReverie",
      "VermillionHereafter",
    ],
  },
  {
    id: "30-def",
    name: "30% DEF",
    sets: ["DefendersWill", "HuskOfOpulentDreams"],
  },
  {
    id: "20-hp",
    name: "20% HP",
    sets: ["VourukashasGlow", "TenacityOfTheMillelith"],
  },
  {
    id: "20-er",
    name: "20% Energy Recharge",
    sets: ["EmblemOfSeveredFate", "Scholar", "TheExile"],
  },
  {
    id: "80-em",
    name: "80 EM",
    sets: [
      "Instructor",
      "WanderersTroupe",
      "FlowerOfParadiseLost",
      "GildedDreams",
    ],
  },
] as const satisfies {
  id: string;
  name: string;
  sets: ArtifactSetKey[];
}[];

export type ArtifactGroupKey = (typeof artifactGroups)[number]["id"];
