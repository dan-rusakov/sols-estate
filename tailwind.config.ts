import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'base': ['Inter', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'welcome-screen-radial-gradient': 'radial-gradient(circle, rgba(194,172,255,1) 0%, rgba(255,255,255,1) 100%)',
      },
    },
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'xs': { 'max': '374px' },
      // => @media (max-width: 374px) { ... }
    }
  },
  plugins: [],
} satisfies Config;
