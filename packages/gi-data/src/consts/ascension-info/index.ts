export const giAscensionLevels = [0, 1, 2, 3, 4, 5, 6] as const;
export type GIAscensionLevel = (typeof giAscensionLevels)[number];

export const giMaxLevelForAscension = {
  0: 20,
  1: 40,
  2: 50,
  3: 60,
  4: 70,
  5: 80,
  6: 90,
} as const satisfies { [ascension in GIAscensionLevel]: number };

export const giMinLevelForAscension = {
  0: 1,
  1: 20,
  2: 40,
  3: 50,
  4: 60,
  5: 70,
  6: 80,
} as const satisfies {
  [ascension in GIAscensionLevel]: number;
};

export type GIJustAscendedLevels = (typeof giMinLevelForAscension)[Exclude<
  GIAscensionLevel,
  0
>];

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type GILevel =
  | {
      type: "ascended";
      level: GIJustAscendedLevels;
    }
  | {
      type: "unascended";
      level: IntRange<1, 91>;
    };

export const getAscension = (level: GILevel): GIAscensionLevel => {
  switch (level.type) {
    case "ascended":
      switch (level.level) {
        case 20:
          return 1;
        case 40:
          return 2;
        case 50:
          return 3;
        case 60:
          return 4;
        case 70:
          return 5;
        case 80:
          return 6;
      }
    case "unascended":
      return (
        level.level <= 40
          ? Math.ceil(level.level / 20) - 1
          : Math.ceil((level.level - 40) / 10) + 1
      ) as GIAscensionLevel;
  }
};
