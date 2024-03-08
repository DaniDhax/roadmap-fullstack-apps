/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "hsl(0, 0%, 100%)",
      "shark": "#252930",
      "bittersweet": "#FF7575",
      "tundora": "#4D4D4D",
      "gray": "#909090",
      "havelock-blue": "#4699E0",
    },
    fontFamily: {
      "recursive": ['"Recursive"', "sans-serif"],
      "poppins": ['"Poppins"', "sans-serif"],
      "Source-Sans-3": ['"Source Sans 3"', "sans-serif"],
    },
  },
};
export const plugins = [];
