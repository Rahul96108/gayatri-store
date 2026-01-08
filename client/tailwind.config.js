/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#F5F1E6',
          crimson: '#8B2312',
          gold: '#D48C2B',
          chocolate: '#2D1A12',
        }
      }
    },
  },
  plugins: [],
}
