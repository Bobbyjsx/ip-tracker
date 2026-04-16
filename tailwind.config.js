/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#050608",
          card: "#121921",
          accent: "#00F3FF",
          secondary: "#00B8C4",
          text: "#E0E6ED",
          glow: "rgba(0, 243, 255, 0.6)",
        },
      },
      fontFamily: {
        mono: ["Space Mono", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/pattern-bg-desktop.png')",
        'mad-pat': "url('/assets/portfolio-image.jpeg')",
      }
    },
  },
  plugins: [],
}
