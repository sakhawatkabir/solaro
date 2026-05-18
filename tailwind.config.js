/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F59E0B",
        "primary-dark": "#D97706",
        "primary-light": "#FDE68A",
        accent: "#166534",
        "accent-light": "#22C55E",
        "accent-mid": "#16A34A",
        cream: "#FFFBF0",
        "cream-dark": "#FEF3C7",
        ink: "#1C1917",
        "ink-mid": "#44403C",
        "ink-light": "#78716C",
        "ink-faint": "#D6D3D1",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
