import { characterInfo, CharacterKey } from "@repo/gi-data/character-info";

export function generateStaticParams() {
  return (Object.keys(characterInfo.characterMap) as CharacterKey[]).map(
    (id) => ({ id })
  );
}

export default function CharacterPageLayout({
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  return children;
}
