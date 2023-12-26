/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rich-white": "#E3FFFA",
        "rich-dark-purple": "#354A7B",
        "rich-purple": "#6581D4",
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
  plugins: [],
};
