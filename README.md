# Chris' Genshin Projects Monorepo

Made using Turborepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `genshin-viewer`: a [Next.js](https://nextjs.org/) app for viewing, and a mediocre copy of [Project Amber](https://gi.yatta.moe)
- `gen-gi-data`: Generates static files from `@repo/gi-data` to use with apps.
- `@repo/gi-data`: Responsible for getting data
- `@repo/utils`: Common utilities used across packages and apps
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Downloading Repo

To git clone the repo do the following:

```bash
git clone --recursive https://github.com/ChrisMGeo/genshin-projects.git
cd genshin-projects
```

### Generating Files

To generate `@repo/gi-data/src/generated/excel-bin-output` and `@repo/gi-data/src/generated/relevant-textmap`, run the following:

```bash
pnpm i
pnpm --filter utils run build
pnpm run gen gi-data-types
pnpm --filter gi-data run build
pnpm --filter gen-gi-data run generate
```

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
