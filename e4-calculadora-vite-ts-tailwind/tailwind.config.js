/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bs-primary': '#3a3f44',
        'bs-secondary': '#7a8288',
        'bs-success': '#62c462',
        'bs-info': '#5bc0de',
        'bs-warning': '#f89406',
        'bs-danger': '#ee5f5b',
      },
      fontFamily: {
        'kaushan': ['"Kaushan Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}

