/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // Light Mode Palette (Original)
        "primary": "#c0755d",
        "primary-hover": "#a8634d",
        "accent-green": "#7f9e8a",
        "soft-cream": "#f9f7f2",
        "dark-cream": "#edeadd",
        "text-dark": "#44403c",
        "text-light": "#78716c",
        "border-soft": "#e6e1d6",
        "white": "#ffffff",
        // Dark Mode Palette (Refined for User Request)
        "dark-charcoal": "#1c1917", // Warm, deep charcoal (Stone-950)
        "dark-card-bg": "#292524", // Slightly lighter warm charcoal (Stone-900)
        "dark-input-bg": "#141211", // Very dark inset for inputs
        "dark-border": "#44403c", // Warm grey border (Stone-700)
        "dark-forest-green": "#0f2e28", // Deep earthy forest green
        "dark-accent": "#d4856e", // Rich terracotta adjusted for dark mode contrast
        "dark-accent-hover": "#b56d58",
        "off-white": "#fafaf9", // Stone-50 for high legibility
        "light-cream": "#e7e5e4", // Stone-200 for secondary text
        "dark-text-medium": "#a8a29e", // Stone-400
        "dark-text-darker": "#57534e", // Stone-600

        // Brand aliases for compatibility if needed (optional, but good for safety)
        "sand": "#f9f7f2", // Mapping new soft-cream to old sand name if used elsewhere
        "surface-light": "#ffffff",
        "background-dark": "#1c1917",
        "surface-dark": "#292524",
      },
      fontFamily: {
        "heading": ["Varela Round", "sans-serif"],
        "body": ["Nunito Sans", "sans-serif"],
        "sans": ["Nunito Sans", "sans-serif"],
        "display": ["Varela Round", "sans-serif"], // Mapping display to heading font
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.25rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}