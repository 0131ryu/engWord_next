/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-green": "#395144",
        "light-green": "#4E6C50",
        "light-brown": "#AA8B56",
        "light-beige": "#F0EBCE",
        "light-orange": "#F0BB62",
        "dark-orange": "#DEAD5B",
        black: {
          DEFAULT: "#010101",
          100: "#0a0b0e",
          200: "#16181D",
          //?FIX this
          300: "#16181D",
          500: "#0f1115",
          700: "#202125",
        },
      },
    },
  },
  plugins: [],
};
