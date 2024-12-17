"use client";

import { CharacterKey } from "@repo/gi-data/character-info";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type BlurringBackgroundProps = {
  children?: React.ReactNode;
  id: CharacterKey;
  splashUrl: string;
};

const BlurringBackground = ({
  children,
  id,
  splashUrl,
}: BlurringBackgroundProps) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        !pathname.endsWith(`/${id}`)
          ? "blur-xl filter xl:opacity-10"
          : "xl:opacity-100",
        "lg:opacity-10 fixed inset-0 -z-1 hidden bg-fixed opacity-10 transition-opacity duration-200 ease-out md:block lg:block xl:block"
      )}
      style={{
        background: `url(${JSON.stringify(splashUrl)}) center center no-repeat`,
      }}
    >
      {children}
    </div>
  );
};

export default BlurringBackground;
