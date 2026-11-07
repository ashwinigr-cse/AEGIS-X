/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#0a0d14',
          800: '#101522',
          700: '#182032',
          600: '#222d46'
        },
        electric: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          glow: '#00d2ff'
        }
      }
    },
  },
  plugins: [],
}
