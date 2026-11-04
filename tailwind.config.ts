import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B2239",
        paper: { DEFAULT: "#FAF9F6", warm: "#F3F0E9" },
        navy: {
          DEFAULT: "#0B2239",
          900: "#071829", 800: "#0B2239", 700: "#16324B", 600: "#3E5A75",
          500: "#5F7A94", 400: "#8AA0B5", 300: "#AFC0D0", 200: "#CFDAE4",
          100: "#E4EBF1", 50: "#F1F5F8",
        },
        teal: {
          DEFAULT: "#0EA5E9",
          50: "#E0F2FE", 100: "#BAE6FD", 200: "#7DD3FC", 300: "#38BDF8",
          400: "#0EA5E9", 500: "#0284C7", 600: "#0369A1", 700: "#075985",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D",
          400: "#FBBF24", 500: "#F59E0B", 600: "#D97706", 700: "#B45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,34,57,0.05), 0 1px 8px rgba(11,34,57,0.04)",
        lift: "0 16px 40px -16px rgba(11,34,57,0.22)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
