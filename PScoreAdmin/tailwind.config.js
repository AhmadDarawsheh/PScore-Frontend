/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: {
          mainColor: "#18453B", //18453B
          secondColor: "#4aa167", //4aa167
          thirdColor: "#83f28f", //83f28f
          myWhite: "#f6f6f6", //f6f6f6
        },
      },
    },
  },
  plugins: [],
};
