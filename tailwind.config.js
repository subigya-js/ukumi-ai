module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        orange: {
          400: '#fb923c',
        },
      },
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}