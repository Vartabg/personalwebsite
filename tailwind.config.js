/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'jets-green': '#125740',
        'jets-black': '#000000',
      },
    },
  },
  plugins: [],
}
