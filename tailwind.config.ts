// tailwind.config.ts
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
        primary: "#588157",
        secondary: "#3A5A40",
        tertiary: "#344E41",
        "base-bg": "#DAD7CD",
        "accent-bg": "#A3B18A",
        "white-text": "#FAFAFA", // A custom name for the off-white text color
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        poppins: ["var(--font-poppins)"],
        nunito: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [],
};
export default config;