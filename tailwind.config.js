/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/assets/bg-4.jpg')"
      },
      colors: {
        "custom-light-gray": "#F5F6F7"
      }
    },
  },
  plugins: [],
}

