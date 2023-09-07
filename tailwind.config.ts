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
  },
  plugins: [],
} satisfies Config;
