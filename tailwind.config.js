/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
      titilium: ['Titillium Web', 'sans-serif']
    },
    colors:{
      courses: {
        green: '#3CB85C',
        lightGreen: '#90EE90',
        darkGreen: '#3d8b3d',
        grey: '#ebebeb',
        darkestGray: '#6c6c6c',
        darkGrey: '#454545',
        red: '#FF0000',
      }
    },
  },
  },
  variants: {},
  plugins: [],
}
