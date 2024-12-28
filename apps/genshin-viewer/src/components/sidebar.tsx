"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const sideBarLinks = [
  {
    name: "Characters",
    href: "/characters",
    svg: { viewBox: "0 0 448 512" },
    path: {
      d: "M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm50.7 48H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3c0-95.7-77.6-173.3-173.3-173.3z",
    },
  },
  {
    name: "Weapons",
    href: "/weapons",
    svg: { viewBox: "0 0 512 512" },
    path: {
      d: "M440.8 4.994C441.9 1.99 444.8 0 448 0s6.1 1.99 7.2 4.994l14.1 37.676L507 56.79c3 1.13 5 4 5 7.21s-2 6.08-5 7.21l-37.7 14.12L455.2 123c-1.1 3-4 5-7.2 5s-6.1-2-7.2-5l-14.1-37.67-38.6-14.12c-3-1.13-4.1-4-4.1-7.21s1.1-6.08 4.1-7.21l38.6-14.12 14.1-37.676zM289.4 97.37c12.5-12.49 32.7-12.49 45.2 0l28.7 28.73 17.4-17.4c6.2-6.3 16.4-6.3 22.6 0 6.3 6.2 6.3 16.4 0 22.6l-17.4 17.4 28.7 28.7c12.5 12.5 12.5 32.7 0 45.2l-10.8 10.9c7.9 22 12.2 45.8 12.2 70.5 0 114.9-93.1 208-208 208C93.12 512 0 418.9 0 304S93.12 96 208 96c24.7 0 48.5 4.3 70.5 12.3l10.9-10.93zM95.1 296c0-57.4 47.5-104 104-104h8c9.7 0 16-7.2 16-16s-6.3-16-16-16h-8c-74.2 0-136 60.9-136 136v8c0 8.8 8.06 16 16 16 9.74 0 16-7.2 16-16v-8z",
    },
  },
  {
    name: "Artifacts",
    href: "/artifacts",
    svg: { viewBox: "0 0 320 512" },
    path: {
      d: "M296 256h-44.63C272.5 222 288 181.6 288 144 288 55.62 230.8 0 160 0S32 55.62 32 144c0 37.6 15.5 78 36.63 112H24c-13.25 0-24 10.8-24 24v32c0 13.25 10.75 24 24 24h96v152c0 13.2 10.8 24 24 24h32c13.25 0 24-10.75 24-24V336h96c13.25 0 24-10.75 24-24v-32c0-13.2-10.8-24-24-24zM160 80c29.62 0 48 24.5 48 64 0 34.62-27.12 78.12-48 100.9-20.9-22.8-48-66.3-48-100.9 0-39.5 18.4-64 48-64z",
    },
  },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed z-20">
      <div></div>
      <nav
        className="duration-400 group fixed bottom-0 w-full select-none overflow-y-scroll border-t-4 border-opacity-60 lg:transition-width lg:ease-in-out md:h-full md:w-20 md:border-t-0 md:border-r-4 md:hover:w-48 lg:h-screen lg:w-20 lg:border-t-0 lg:border-r-4 lg:hover:w-48 bg-white"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="group mx-4 mt-4 hidden list-none flex-row md:flex md:h-full md:flex-col md:gap-2 lg:flex lg:h-full lg:flex-col lg:gap-2 xl:flex xl:gap-2">
          {sideBarLinks.map(
            ({ href, name, svg: { viewBox }, path: { d } }, i) => {
              return (
                <Link
                  href={href}
                  key={i}
                  className={clsx(
                    "flex h-10 flex-shrink-0 cursor-pointer items-center gap-4 rounded-md hover:bg-opacity-10 hover:bg-black",
                    pathname.startsWith(href) && "bg-opacity-10 bg-black"
                  )}
                >
                  <span className="ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={viewBox}
                      className="h-5 w-5 fill-current"
                    >
                      <path d={d} />
                    </svg>
                  </span>
                  <span className="text-left text-sm font-bold leading-tight opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {name}
                  </span>
                </Link>
              );
            }
          )}
        </div>
        <div className="flex w-full h-16 flex-row items-center justify-evenly md:hidden lg:hidden text-xs select-none">
          {sideBarLinks.map(
            ({ href, name, svg: { viewBox }, path: { d } }, i) => {
              return (
                <Link
                  href={href}
                  key={i}
                  className="w-24 h-14 flex flex-col items-center justify-center gap-1"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={viewBox}
                  >
                    <path d={d}></path>
                  </svg>
                  <span>{name}</span>
                </Link>
              );
            }
          )}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
