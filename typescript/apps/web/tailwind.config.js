/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    // "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        gray: colors.neutral,
      },
    },
  },
  // Make sure you require daisyui AFTER @tailwindcss/typography in tailwind.config.js
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
