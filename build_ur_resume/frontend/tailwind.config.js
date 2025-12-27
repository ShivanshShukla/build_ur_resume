/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Unified Palette
        "primary": "#c0755d", // Updated Terracotta
        "primary-light": "#e8b4a7",
        "primary-hover": "#a8634d",
        "secondary": "#5a6c4f", // Earthy Green
        "accent-green": "#7f9e8a",
        "cream": "#fdfbf7",
        "soft-cream": "#f9f7f2",
        "dark-cream": "#edeadd",
        "sand": "#f4f1ea",
        "background-light": "#fcfbf7",
        "background-dark": "#1c1917", // Warm dark grey
        "surface-light": "#ffffff",
        "surface-dark": "#292524",
        "white": "#ffffff",

        // Text
        "text-main": "#3f3a36", // Soft charcoal
        "text-muted": "#756d66", // Warm grey
        "text-dark": "#44403c",
        "text-light": "#78716c",
        "border-soft": "#e6e1d6",

        // Dark Mode Specifics
        "dark-charcoal": "#1c1917",
        "dark-card-bg": "#292524",
        "dark-input-bg": "#141211",
        "dark-border": "#44403c",
        "dark-forest-green": "#0f2e28",
        "dark-accent": "#d4856e",
        "dark-accent-hover": "#b56d58",
        "off-white": "#fafaf9",
        "light-cream": "#e7e5e4",
        "dark-text-medium": "#a8a29e",
        "dark-text-darker": "#57534e",
      },
      fontFamily: {
        "display": ["Nunito", "sans-serif"],
        "heading": ["Varela Round", "sans-serif"],
        "body": ["Nunito Sans", "sans-serif"], // Updated to Nunito Sans
        "sans": ["Nunito Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.375rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}