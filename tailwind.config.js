module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
    colors: {
      'dark-primary': '#2B2D42',
      'dark-secondary': '#8D99AE',
      'white-secondary': '#EDF2F4',
    },
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],
}
