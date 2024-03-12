/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'oleo-script': ['Oleo Script', 'sans-serif'],
        'lateef': ['Lateef', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

