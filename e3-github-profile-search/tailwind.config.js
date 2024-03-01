/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bs-primary': '#df6919',
        'bs-secondary': '#4e5d6c',
        'bs-success': '#5cb85c',
        'bs-info': '#5bc0de',
        'bs-warning': '#ffc107',
        'bs-danger': '#d9534f',
      },
      fontFamily: {
        'kaushan': ['"Kaushan Script"', 'cursive'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

