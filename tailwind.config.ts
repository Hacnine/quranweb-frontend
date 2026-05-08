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
        // Exact colors from reference site (dark mode CSS variables)
        "qm-bg": "#0d0d0d",        // --color-primary-background: 0 0% 5%
        "qm-sidebar": "#171717",   // --color-secondary-background: 0 0% 9%
        "qm-card": "#121212",      // --color-card-background: 0 0% 7%
        "qm-card-shade": "#1c1c1c",// --color-card-shade: 0 0% 11%
        "qm-border": "#212121",    // --color-border: 0 0% 13%
        "qm-green": "#418038",     // --color-primary: 112 39% 36%
        "qm-green-dim": "#1a3016", // primary at ~10% lightness for active bg
        "qm-text": "#c4c4c4",      // --color-pure: 0 0% 77%
        "qm-muted": "#787d7a",     // --color-subtitle: 150 2% 48%
        "qm-icon": "#8f9491",      // --color-icon: 150 2% 57%
        "qm-fg": "#ffffff",        // --color-primary-foreground: 0 0% 100%
        // backwards-compat aliases
        "dark-navy": "#0d0d0d",
        "dark-card": "#121212",
        "dark-border": "#212121",
      },
      fontFamily: {
        arabic: ["Amiri", "serif"],
      },
      height: {
        "nav": "60px",
      },
      width: {
        "nav": "60px",
        "sidebar": "300px",
      },
    },
  },
  plugins: [],
};

export default config;
