module.exports = {
  content: ["./**/*.{html,}","./input/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-children')],
}
