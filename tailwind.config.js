/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "green-glow-radial":
          "radial-gradient(farthest-corner, #22796F, #01312B)",
        "red-glow-radial": "radial-gradient(farthest-corner, #F77578, #310101)",
      },
      colors: {
        "rich-dark-purple": "#0D0131",
        "rich-purple": "#302380",
        "rich-light-purple": "#8F75F7",
        "rich-dark-red": "#310101",
        "rich-red": "#802323",
        "rich-light-red": "#F77578",
        "rich-dark-green": "#01312B",
        "rich-dark-light-green": "#22796F",
        "rich-green": "#00AC8C",
        "rich-light-green": "#00CBA6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
