import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        surface: "#0f172a",
        panel: "#0b1220",
        ink: "#e2e8f0",
        muted: "#94a3b8",
        accent: {
          DEFAULT: "#7c3aed",
          soft: "rgba(124, 58, 237, 0.12)"
        },
        border: "#1f2937",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0,0,0,0.35)",
        soft: "0 14px 40px rgba(124,58,237,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
