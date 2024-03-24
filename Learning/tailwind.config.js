/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    colors: {
      'white': '#fff',
      'blue': '#001174',
      'rblue': '#4169E1',
      'lblue': '#ebefff',
      'gray': '#9c9c9c',
      'lgray': '#e9e9e9',
      'teal': '#02dfdf',
      'lteal': '#b9ffff',
      'dteal': '#009999',
      'turquoise': '#2cdbca',
      'seagreen': '#2E8B57',
      'coral': '#e06d6d',
      'lcoral': '#fac4c4',
      'red': '#ff0000',
    },
    fontWeight: {
      semibold: '650',
      bold: '750',
    },
    borderRadius: {
      DEFAULT: '0.3rem',
      '2xl': '1rem',
      '10xl': '5rem',
    },
    extend: {
      maxWidth: {
        '68': '17rem',
        '92': '23rem',
        '200': '50rem',
      },
      screens: {
        'lg': { 'raw': '(max-width: 1102px)' },
        'sm': { 'raw': '(max-width: 620px)' },
      }
    },
  },
  plugins: [],
}

// $blue-color:  #001174;
// $royal-blue-color: #4169E1;
// $light-blue-color: #ebefff;
// $gray-color: #9c9c9c;
// $light-gray-color: #e9e9e9;
// $teal-color: #02dfdf;
// $light-teal-color: #b9ffff;
// $dark-teal-color: #009999;
// $turquoise-color: #2cdbca;
// $seagreen-color: #2E8B57;
// $coral-color: #e06d6d;
// $light-coral-color: #fac4c4;