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
      backgroundImage: {
        texture: "url('~@/assets/deco/batik-decoration.png')",
      },
      fontSize: {
        "2xs": ["0.5rem", { lineHeight: "0.7rem" }],
      },
      height: {
        "7/8-screen": "87.5vh",
        "3/4-screen": "75vh",
        "1/2-screen": "50vh",
        "1/3-screen": "33.333333vh",
        "1/4-screen": "25vh",
      },
      width: {
        "3/4-screen": "75vw",
        "1/2-screen": "50vw",
        "1/3-screen": "33.333333vw",
        "1/4-screen": "25vw",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
      borderWidth: ["focus"],
      height: ["responsive"],
      overflow: ["hover"],
    },
  },
  plugins: [],
};
