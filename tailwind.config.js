/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['EB Garamond', 'sans-serif'],
      sans: ['EB Garamond', 'sans-serif'],
      body: ['EB Garamond', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {
      visibility: ['responsive', 'hover'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.perspective-0': {
          perspective: '0px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };
      addUtilities(newUtilities, {
        variants: ['responsive', 'hover'],
      });
    }),
  ],
};
