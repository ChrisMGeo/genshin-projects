import { expect, test } from "vitest";
import { getAscension, GIAscensionLevel, type GILevel } from "./index.js";

test.each<{ input: GILevel; expectedOutput: GIAscensionLevel }>([
  { input: { type: "unascended", level: 1 }, expectedOutput: 0 },
  { input: { type: "unascended", level: 20 }, expectedOutput: 0 },

  { input: { type: "ascended", level: 20 }, expectedOutput: 1 },
  { input: { type: "unascended", level: 21 }, expectedOutput: 1 },
  { input: { type: "unascended", level: 40 }, expectedOutput: 1 },

  { input: { type: "ascended", level: 40 }, expectedOutput: 2 },
  { input: { type: "unascended", level: 41 }, expectedOutput: 2 },
  { input: { type: "unascended", level: 50 }, expectedOutput: 2 },

  { input: { type: "ascended", level: 50 }, expectedOutput: 3 },
  { input: { type: "unascended", level: 51 }, expectedOutput: 3 },
  { input: { type: "unascended", level: 60 }, expectedOutput: 3 },

  { input: { type: "ascended", level: 60 }, expectedOutput: 4 },
  { input: { type: "unascended", level: 61 }, expectedOutput: 4 },
  { input: { type: "unascended", level: 70 }, expectedOutput: 4 },

  { input: { type: "ascended", level: 70 }, expectedOutput: 5 },
  { input: { type: "unascended", level: 71 }, expectedOutput: 5 },
  { input: { type: "unascended", level: 80 }, expectedOutput: 5 },

  { input: { type: "ascended", level: 80 }, expectedOutput: 6 },
  { input: { type: "unascended", level: 81 }, expectedOutput: 6 },
  { input: { type: "unascended", level: 90 }, expectedOutput: 6 },
])(
  "getAscension($input.type, $input.level) -> $expectedOutput",
  ({ input, expectedOutput }) => {
    expect(getAscension(input)).toBe(expectedOutput);
  }
);
