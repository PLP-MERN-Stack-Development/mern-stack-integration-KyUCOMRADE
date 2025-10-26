/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // indigo-500
        accent: "#f472b6",  // pink-400
        dark: "#0f172a",    // slate-900
      },
    },
  },
  plugins: [],
};
