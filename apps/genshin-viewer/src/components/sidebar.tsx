"use client";

import Link from "next/link";

const SideBar = () => {
  return (
    <div className="fixed z-20">
      <div></div>
      <div className="hidden fixed relative inline-block h-screen w-screen justify-center overflow-y-scroll overscroll-y-contain"></div>
      <nav
        className="duration-400 group fixed bottom-0 w-full select-none overflow-y-scroll border-t-4 border-opacity-60 lg:transition-width lg:ease-in-out md:h-full md:w-20 md:border-t-0 md:border-r-4 md:hover:w-48 lg:h-screen lg:w-20 lg:border-t-0 lg:border-r-4 lg:hover:w-48 bg-white"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="group mx-4 mt-4 hidden list-none flex-row md:flex md:h-full md:flex-col md:gap-2 lg:flex lg:h-full lg:flex-col lg:gap-2 xl:flex xl:gap-2">
          <Link
            href="/characters"
            className="flex h-10 flex-shrink-0 cursor-pointer items-center gap-4 rounded-md bg-opacity-40 hover:bg-opacity-40"
          >
            <span className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-5 w-5 fill-current"
              >
                <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm50.7 48H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3c0-95.7-77.6-173.3-173.3-173.3z" />
              </svg>
            </span>
            <span className="text-left text-sm font-bold leading-tight opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Characters
            </span>
          </Link>

          <Link
            href="/weapons"
            className="flex h-10 flex-shrink-0 cursor-pointer items-center gap-4 rounded-md bg-opacity-40 hover:bg-opacity-40"
          >
            <span className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-5 w-5 fill-current"
              >
                <path d="M440.8 4.994C441.9 1.99 444.8 0 448 0s6.1 1.99 7.2 4.994l14.1 37.676L507 56.79c3 1.13 5 4 5 7.21s-2 6.08-5 7.21l-37.7 14.12L455.2 123c-1.1 3-4 5-7.2 5s-6.1-2-7.2-5l-14.1-37.67-38.6-14.12c-3-1.13-4.1-4-4.1-7.21s1.1-6.08 4.1-7.21l38.6-14.12 14.1-37.676zM289.4 97.37c12.5-12.49 32.7-12.49 45.2 0l28.7 28.73 17.4-17.4c6.2-6.3 16.4-6.3 22.6 0 6.3 6.2 6.3 16.4 0 22.6l-17.4 17.4 28.7 28.7c12.5 12.5 12.5 32.7 0 45.2l-10.8 10.9c7.9 22 12.2 45.8 12.2 70.5 0 114.9-93.1 208-208 208C93.12 512 0 418.9 0 304S93.12 96 208 96c24.7 0 48.5 4.3 70.5 12.3l10.9-10.93zM95.1 296c0-57.4 47.5-104 104-104h8c9.7 0 16-7.2 16-16s-6.3-16-16-16h-8c-74.2 0-136 60.9-136 136v8c0 8.8 8.06 16 16 16 9.74 0 16-7.2 16-16v-8z" />
              </svg>
            </span>
            <span className="text-left text-sm font-bold leading-tight opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Weapons
            </span>
          </Link>
        </div>
        <div className="flex w-full h-16 flex-row items-center justify-evenly md:hidden lg:hidden text-xs select-none"></div>
      </nav>
    </div>
  );
};

export default SideBar;
