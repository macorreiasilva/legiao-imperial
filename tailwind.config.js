/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        imperial: {
          primary: "#E10600",
          secondary: "#111111",
          dark: "#1F1F1F",
          "dark-gray": "#2B2B2B",
          "light-gray": "#ECECEC",
        },
        tier: {
          bronze: "#CD7F32",
          prata: "#C0C0C0",
          ouro: "#FFD700",
          elite: "#B9F2FF",
        },
      },
    },
  },
  plugins: [],
};
