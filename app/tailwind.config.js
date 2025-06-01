/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00a4a6",          // EZPoly teal
        "primary-foreground": "#FFFFFF", // White
        accent:  "#ffd836",          // highlight yellow
        "accent-foreground": "#374151",  // Dark Gray
        "muted-foreground": "#6b7280", // Medium Gray
        background: "#FFFFFF",       // White
        foreground: "#000000",       // Black
        
        // Standard gray scale - this is critical!
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6", 
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",  // This fixes text-gray-500
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        }
      }
    }
  },
  plugins: []
};
