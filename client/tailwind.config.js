/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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

        primary: '#FFD369',
        lightPrimary: '#ffe8b3',
        darkPrimary: '#e6a100',

        danger: '#E01B00',
        darkDanger: '#BE1700',
        lightDanger: '#FCE8E5',

        success: '#009D4F',
        lightSuccess: '#E5F5ED',
        darkSuccess: '',

        warning: '#FFB600',
        lightWarning: '#FFF8E5',
        darkWarning: ''

      },
    },
    transitionDuration: {
      '300': '300ms',
      '500': '500ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'ease-in-out',
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
    },
  },
  plugins: [],
};
