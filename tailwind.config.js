const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Rangni yo hex kodda yoki obyekt ko'rinishida bering
        "agro-lime": "#84cc16",
        "about-txt": "#04303B", // Bu asl lime-500 rangi, xohlasangiz o'zgartiring
      },
      fontSize: {
        hero: "50px", // 'text' emas 'fontSize' bo'lishi shart
      },
      // Animatsiya uchun keyframelar
      keyframes: {
        fadeUpBlur: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
            filter: "blur(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0px)",
          },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        } ,
      },
      // Animatsiyani nomlash
      animation: {
        "fade-up-blur": "fadeUpBlur 0.8s ease-out forwards",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
    },
  },
  plugins: [],
})
