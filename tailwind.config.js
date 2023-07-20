/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
          backgroundImage: {
            'hero-pattern': "url('/assets/pattern-bg-desktop.png')",
            'mad-pat': "url('/assets/portfolio-image.jpeg')",
          }
    },
  },
  plugins: [],
}