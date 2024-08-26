/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // フォントを追加
      fontFamily: {
        reggae: ["Reggae One"],
        DotGothic16: ["DotGothic16"],
      },
    },
  },
  plugins: [],
};
