/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pixel-blue': '#3D52A0',
        'pixel-light-blue': '#7091E6',
        'pixel-purple': '#ADBBDA',
        'pixel-white': '#EAEFFF',
        'pixel-black': '#1E1E1E',
        'pixel-red': '#D9534F',
        'pixel-green': '#5CB85C',
      },
      fontFamily: {
        sans: ['"Press Start 2P"', 'cursive'],
        mono: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px #1E1E1E',
        'pixel-sm': '2px 2px 0px #1E1E1E',
      },
      borderRadius: {
        'none': '0',
      }
    },
  },
  plugins: [],
}
