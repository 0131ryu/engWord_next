/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#395144",
        "light-green": "#4E6C50",
        "light-brown": "#AA8B56",
        "light-beige": "#F0EBCE",
        "light-orange": "#F0BB62",
      },
    },
  },
  plugins: [],
};
