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
        // Light Mode Palette (Boutique Aesthetic)
        "primary": "#EAD2BF", // Soft Terracotta
        "primary-hover": "#dcc0aa", // Slightly darker for hover
        "secondary": "#A3B5A1", // Earthy Green
        "accent-green": "#A3B5A1", // Mapping Secondary to accent-green
        "soft-cream": "#FDF9F5", // Creamy White
        "cream": "#FDF9F5",
        "text-dark": "#4A4A4A", // Charcoal Grey
        "text-light": "#8C8C8C", // Medium Grey
        "border-soft": "#C79F7F", // Muted Gold/Bronze (Accent) for key borders
        "white": "#ffffff",

        // Dark Mode Palette (Boutique Aesthetic - Dark)
        "dark-charcoal": "#2C2C2C", // Deep Grey (Background)
        "dark-card-bg": "#363636", // Slightly lighter than bg
        "dark-input-bg": "#242424", // Slightly darker than bg
        "dark-border": "#4F6B4F", // Deep Forest Green or Bronze? Using Secondary Dark for contrast
        "dark-forest-green": "#4F6B4F", // Deep Forest Green
        "dark-accent": "#8B4513", // Saddle Brown (Primary Dark) - used for main buttons
        "dark-accent-hover": "#9e531e",
        "off-white": "#FDF9F5", // Creamy White (High Contrast Text)
        "light-cream": "#BEBEBE", // Light Grey (Muted Text)
        "dark-text-medium": "#BEBEBE",
        "dark-text-darker": "#8C8C8C",
        "dark-gold": "#B8860B", // Dark Goldenrod (True Accent)
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
  plugins: [
    require("@tailwindcss/forms"),
  ],
}