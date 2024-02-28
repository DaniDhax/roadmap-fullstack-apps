/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "hsl(0, 0%, 100%)",
        "body-background": "#252930",
      },
      fontFamily: {
        "recursive": ['"Recursive"', "sans-serif"],
        "poppins": ['"Poppins"', "sans-serif"],
      },
      
    },
  },
  plugins: [],
};
