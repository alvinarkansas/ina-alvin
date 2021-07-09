module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        md: "772px",
      },
      colors: {
        linen: "#E0DEDA",
        "linen-dark": "#C9C3B7",
        "linen-darker": "#999181",
      },
      fontFamily: {
        "cormorant-uprignt": ["Cormorant Upright", "serif"],
        "cormorant-sc": ["Cormorant SC", "serif"],
        "cormorant-infant": ["Cormorant Infant", "serif"],
        gilda: ["Gilda Display", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
