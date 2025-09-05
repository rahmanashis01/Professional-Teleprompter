/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bengali': ['Hind Siliguri', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'typeAndDelete': 'typeAndDelete 6s steps(20) infinite',
        'blinkCursor': 'blinkCursor 0.5s step-end infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        typeAndDelete: {
          '0%, 10%': { width: '0' },
          '45%, 55%': { width: '100%' },
          '90%, 100%': { width: '0' },
        },
        blinkCursor: {
          '50%': { 'border-right-color': 'transparent' },
        },
      },
    },
  },
  plugins: [],
}
