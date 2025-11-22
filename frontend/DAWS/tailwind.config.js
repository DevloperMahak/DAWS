/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f7f7f8",
          dark: "#0f0f0f",
        },
        leet: {
          bg: "#0d1117", // LeetCode-style dark mode
          panel: "#161b22",
          text: "#c9d1d9",
          accent: "#ff8c00",
        },
      },
    },
  },
  plugins: [],
};
