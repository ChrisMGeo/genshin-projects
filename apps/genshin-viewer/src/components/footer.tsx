import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("ui.footer");
  return (
    <footer className="mt-auto mb-14 select-none px-4 py-4 md:mb-0 md:pl-28 lg:mb-0 lg:pl-28 bg-white">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-center border-opacity-20 text-sm md:text-lg lg:mr-auto lg:text-lg xl:text-lg">
          <div>{t("mainText")}</div>
        </div>

        <div className="flex flex-col border-opacity-20 lg:border-r-2 lg:pr-4">
          {t("githubRepoText")}
          <div className="flex flex-row items-center">
            <Link href="https://github.com/ChrisMGeo/genshin-projects/tree/main/apps/genshin-viewer">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 98 96"
                  className="h-9 w-9 fill-current px-1"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col pr-4">
          {t("madeWithText")}
          <div className="flex flex-row items-center">
            <Link className="px-1" href="https://nextjs.org/">
              <svg
                viewBox="0 0 180 180"
                className="h-9 w-9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_408_134"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="180"
                  height="180"
                >
                  <circle cx="90" cy="90" r="90" fill="black" />
                </mask>
                <g mask="url(#mask0_408_134)">
                  <circle cx="90" cy="90" r="90" fill="black" />
                  <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#paint0_linear_408_134)"
                  />
                  <rect
                    x="115"
                    y="54"
                    width="12"
                    height="72"
                    fill="url(#paint1_linear_408_134)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_408_134"
                    x1="109"
                    y1="116.5"
                    x2="144.5"
                    y2="160.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_408_134"
                    x1="121"
                    y1="54"
                    x2="120.799"
                    y2="106.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
            <Link className="px-1" href="https://tailwindcss.com/">
              <svg
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
              >
                <path
                  d="M489.5 226.499c-161.5 5.133-209.5 120.5-220.5 183 14.333-23.167 59.5-73.999 126-73.999 77.5 0 136.5 86.5 172.5 113.5 43.737 32.803 131.623 76.115 247 41 92-28 134.667-125.668 144-172.001-44.5 60.5-112 96.839-195.5 54-57.5-29.5-100.5-150.999-273.5-145.5zM261 500.999c-161.5 5.133-209.5 120.5-220.5 183C54.833 660.832 100 610 166.5 610 244 610 303 696.5 339 723.5c43.737 32.803 131.623 76.115 247 41 92-28 134.667-125.668 144-172.001-44.5 60.5-112 96.839-195.5 54C477 616.999 434 495.5 261 500.999z"
                  fill="#07B6D5"
                ></path>
              </svg>
            </Link>
            <Link className="px-1" href="https://vercel.com/">
              <svg
                viewBox="0 0 1155 1000"
                className="h-9 w-9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
