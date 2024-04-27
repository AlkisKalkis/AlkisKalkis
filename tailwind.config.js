/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        navBar: '"logo search menu" auto/min-content 1fr min-content',
      },
    },
  },
  plugins: [],
};
