/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '700px': '700px',
      },
      height: {
        '600px': '600px'
      },
      maxHeight: {
        '700px': '700px',
      },
      minHeight: {
        '40px': '40px',
        '50px': '50px'
      },
      maxWidth: {
        '310px': '310px',
        'cartDiv': '800px',
        'orderList' : '600px',
      },
      minWidth: {
        '74px': '74px',
        '100px' : '100px'
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide')
  ],
  daisyui: {
    themes: ['garden'],
  },
};
