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
        background: "var(--background)",
        foreground: "var(--foreground)",
        noir: {
          void: "#050505",
          onyx: "#121212",
          card: "#181818",
          silver: "#E5E5E5",
          muted: "#8E8E93",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
      },
      transitionTimingFunction: {
        "bezier-premium": "cubic-bezier(0.16, 1, 0.3, 1)", // Ultra-smooth cinematic deceleration
      },
      animation: {
        "noise-grain": "noise 0.2s infinite",
        "glow-pulse": "glow 8s ease-in-out infinite alternate",
      },
      keyframes: {
        noise: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1%, -1%)" },
          "30%": { transform: "translate(-2%, -2%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "70%": { transform: "translate(1%, -2%)" },
          "90%": { transform: "translate(-2%, 1%)" },
        },
        glow: {
          "0%": { opacity: "0.3", filter: "blur(80px)" },
          "100%": { opacity: "0.6", filter: "blur(120px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;