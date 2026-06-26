const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        wine: "#8B1A2F",
        "wine-dark": "#6B1323",
        "wine-light": "#B8364D",
        rose: "#C4435A",
        ember: "#C4612A",
        // Surfaces
        ivory: "#F9F8F6",
        cream: "#F0EDE8",
        parchment: "#E8E3DB",
        // Text
        charcoal: "#0F0F0F",
        slate: "#3D3D3D",
        ash: "#787878",
        // UI
        border: "#E5E0D8",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite alternate",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        marquee: "marquee 25s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        pulse2: "pulse2 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1deg)" },
        },
        blob: {
          "0%": { borderRadius: "60% 40% 55% 45% / 55% 45% 55% 45%" },
          "33%": { borderRadius: "40% 60% 45% 55% / 45% 55% 45% 55%" },
          "66%": { borderRadius: "50% 50% 35% 65% / 60% 40% 60% 40%" },
          "100%": { borderRadius: "55% 45% 60% 40% / 40% 60% 40% 60%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.95)" },
        },
      },
      backgroundImage: {
        "dot-pattern":
          "radial-gradient(circle, #d5cfc6 1px, transparent 1px)",
        "wine-gradient":
          "linear-gradient(135deg, #8B1A2F 0%, #6B1323 100%)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 70% at 70% 40%, rgba(196,67,90,0.08) 0%, transparent 65%)",
      },
      backgroundSize: {
        "dot-sm": "28px 28px",
        "dot-md": "40px 40px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover":
          "0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.1)",
        wine: "0 8px 32px rgba(139,26,47,0.25)",
        "wine-sm": "0 4px 16px rgba(139,26,47,0.18)",
      },
      maxWidth: { "8xl": "88rem", "9xl": "96rem" },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#8B1A2F", foreground: "#FFFFFF" },
            secondary: { DEFAULT: "#C4612A", foreground: "#FFFFFF" },
            success: { DEFAULT: "#16a34a", foreground: "#FFFFFF" },
            warning: { DEFAULT: "#d97706", foreground: "#FFFFFF" },
            danger: { DEFAULT: "#dc2626", foreground: "#FFFFFF" },
          },
        },
      },
    }),
  ],
};
