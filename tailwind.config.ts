import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0B0E14',
        'card-bg': '#151923',
        'primary-purple': '#6C5DD3',
        'accent-teal': '#00B87C',
        'accent-gold': '#FFB03A',
      }
    },
  },
  plugins: [],
};
export default config;
