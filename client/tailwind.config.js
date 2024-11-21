/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'phone': '360px',
      'desktop': '1920px',
      // => desktop@media (min-width: 1920px) { ... }
    },
    colors: {
      'white': '#FCF5ED',
      'black': '#1F1717',
      'orange': '#F4BF96',
      'pink': '#CE5A67',
    },
    fontFamily: {
      sans: ["Noto Sans",  "sans-serif"],
      serif: ["Noto Serif", "serif"],
    },
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
