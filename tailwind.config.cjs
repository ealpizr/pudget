/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pudgetDisplay: ["Allerta Stencil", "sans-serif"],
        pudgetBody: ["Inter", "sans-serif"],
      },
      colors: {
        pudgetYellow: "#FFD60A",
      },
    },
  },
  plugins: [],
};
