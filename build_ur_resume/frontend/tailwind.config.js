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
        // Brand
        "primary": "#c05a42",
        "primary-light": "#e8b4a7",
        "secondary": "#5a6c4f",

        // Light Mode Structure
        "sand": "#f4f1ea", // light.background.page
        "surface-light": "#ffffff", // light.background.surface
        "subtle-light": "#f5f5f4", // light.background.subtle
        "feature-card-light": "#fafaf9", // light.background.featureCard

        // Light Mode Text
        "text-main": "#3f3a36",
        "text-muted": "#756d66",
        "text-inverse": "#ffffff",

        // Light Mode Borders
        "border-default": "#e7e5e4",
        "border-strong": "#d6d3d1",

        // Dark Mode Structure
        "background-dark": "#1c1917", // dark.background.page (mapped to background-dark for compatibility)
        "surface-dark": "#292524", // dark.background.surface
        "subtle-dark": "#292524",
        "feature-card-dark": "rgba(28, 25, 23, 0.5)",

        // Dark Mode Text (Using 'dark-' prefix or semantic mapping?)
        // In home.jsx I used: dark:text-stone-200, dark:text-white. 
        // I should stick to the specific palette provided.
        // But home.jsx is hardcoded with utility classes like text-stone-300. 
        // I might need to update home.jsx later or map these here if I want to enforce the palette.
        // For now, I will define the palette.

        "text-main-dark": "#d6d3d1",
        "text-muted-dark": "#a8a29e",
        "text-inverse-dark": "#1c1917",

        "border-default-dark": "#292524",
        "border-strong-dark": "#44403c",

        // Action Buttons
        "btn-primary-bg": "#c05a42",
        "btn-primary-text": "#ffffff",
        "btn-secondary-bg": "#f5f5f4",
        "btn-secondary-text": "#3f3a36",

        // Status
        "status-star": "#fbbf24",
        "status-trusted-text": "#5a6c4f",
        "status-trusted-bg": "rgba(90, 108, 79, 0.1)",

        // Misc defaults/aliases to prevent breakage
        "cream": "#fdfbf7", // Keep just in case
      },
      fontFamily: {
        "display": ["Nunito", "sans-serif"],
        "heading": ["Varela Round", "sans-serif"],
        "body": ["DM Sans", "sans-serif"], // Requested update
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
  plugins: [
    require("@tailwindcss/forms"),
  ],
}