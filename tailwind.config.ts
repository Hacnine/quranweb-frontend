import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // QuranMazid-style dark theme
        "qm-bg": "#131318",
        "qm-sidebar": "#1a1a22",
        "qm-card": "#1e1e28",
        "qm-border": "#2a2a38",
        "qm-green": "#4ade80",
        "qm-green-dim": "#166534",
        "qm-text": "#e2e8f0",
        "qm-muted": "#6b7280",
        // backwards-compat aliases
        "dark-navy": "#131318",
        "dark-card": "#1e1e28",
        "dark-border": "#2a2a38",
      },
      fontFamily: {
        arabic: ["Amiri", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
