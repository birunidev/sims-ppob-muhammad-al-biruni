/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F42619',
          secondary: '#C6C0C0',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          success: '#52BD94',
          'base-content': '#000000',
        },
      },
      'dark',
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
}
