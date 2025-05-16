/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00a4a6",          // EZPoly teal
        accent:  "#ffd836",          // highlight yellow
        "muted-foreground": "#cccccc"
      }
    }
  },
  plugins: []
};
