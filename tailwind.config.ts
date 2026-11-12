import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B12",
        "bg-secondary": "#101722",
        surface: "#151F2D",
        "surface-secondary": "#1B2838",
        "surface-panel": "#151F2D",
        "surface-elevated": "#1B2838",
        border: "#263447",
        "border-industrial": "#263447",
        primary: "#28D7F2", // Electric cyan
        "primary-glow": "rgba(40, 215, 242, 0.25)",
        secondary: "#9875FF", // Neon violet
        success: "#39E58C", // Bright green
        warning: "#FFB547", // Amber
        danger: "#FF5F6D", // Coral red
        text: {
          primary: "#F3F7FC",
          secondary: "#9AA9BB",
          muted: "#627387",
        },
        brand: {
          cyan: "#28D7F2",
          violet: "#9875FF",
          green: "#39E58C",
          amber: "#FFB547",
          coral: "#FF5F6D",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "Consolas", "monospace"],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(40, 215, 242, 0.35)',
        'glow-violet': '0 0 20px -3px rgba(152, 117, 255, 0.35)',
        'glow-green': '0 0 20px -3px rgba(57, 229, 140, 0.35)',
        'glow-coral': '0 0 20px -3px rgba(255, 95, 109, 0.35)',
        'card-industrial': '0 4px 20px -2px rgba(8, 11, 18, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'conveyor-smooth': 'conveyor 1.5s linear infinite',
        'conveyor-fast': 'conveyor 0.75s linear infinite',
        'piston': 'pistonMove 1.2s ease-in-out infinite',
        'liquid-fill': 'liquidWave 2s ease-in-out infinite alternate',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        conveyor: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(32px)' },
        },
        pistonMove: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        liquidWave: {
          '0%': { transform: 'scaleY(0.98)' },
          '100%': { transform: 'scaleY(1.02)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
