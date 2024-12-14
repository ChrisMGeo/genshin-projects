import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        // windowed: "calc(100vh - 12rem)",
      },
      zIndex: {
        1: "1",
      },
      colors: {},
    },
  },
  plugins: [],
} satisfies Config;
