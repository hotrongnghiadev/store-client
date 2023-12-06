import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    fontFamily: {
      primary: ["Nunito Sans", "sans-serif"],
    },
    // overriding
    extend: {
      colors: {
        primary: "#FEBF4E",
      },
      keyframes: {
        burn: {
          "100%": { "box-shadow": "var(--green-500) 0 0 1.25rem" },
        },
      },
      animation: {
        "my-burn": "burn .3s ease-out 1",
      },
      zIndex: {
        99: "99",
        999: "999",
      },
    },
  },
  plugins: [],
};
