/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/pages/**/**/*.{js,ts,jsx,tsx,mdx,html}",
    ,
  ],
  theme: {
    extend: {
      fontFamily,
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")({
      className: "editorTypographyStyling",
    }),
  ],
};
