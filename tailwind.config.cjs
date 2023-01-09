/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '700px': '700px',
      },
      maxHeight: {
        '700px': '700px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['garden'],
  },
};
