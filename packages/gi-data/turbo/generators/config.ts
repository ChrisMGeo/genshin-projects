import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

const customAction: PlopTypes.CustomActionFunction = async (answers) => {
  return "Finished data fetching!";
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("gi-data-types", {
    description: "Adds a new react component",
    prompts: [],
    actions: [],
  });
}
