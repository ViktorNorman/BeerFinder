/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [],
};
