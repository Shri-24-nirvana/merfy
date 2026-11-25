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
        // Light vibrant palette
        'game-bg': '#F0F4FF',
        'game-card': '#FFFFFF',
        'game-panel': '#F8FAFF',
        'game-border': '#E2E8F0',
        'game-border-strong': '#CBD5E1',

        'brand-indigo': '#6366F1',
        'brand-purple': '#8B5CF6',
        'brand-pink': '#EC4899',
        'brand-orange': '#F97316',
        'brand-teal': '#14B8A6',
        'brand-green': '#10B981',
        'brand-blue': '#3B82F6',
        'brand-amber': '#F59E0B',
        'brand-red': '#EF4444',

        'text-game': '#1E1E2E',
        'text-game-2': '#64748B',
        'text-game-3': '#94A3B8',

        // Legacy support (keep some components working)
        background: "#F0F4FF",
        surface: "#FFFFFF",
        "surface-panel": "#F8FAFF",
        primary: "#6366F1",
        secondary: "#8B5CF6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        border: "#E2E8F0",
        text: {
          primary: "#1E1E2E",
          secondary: "#64748B",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "Consolas", "monospace"],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'game': '0 2px 8px rgba(99,102,241,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'game-md': '0 4px 20px rgba(99,102,241,0.12), 0 2px 4px rgba(0,0,0,0.06)',
        'game-lg': '0 8px 32px rgba(99,102,241,0.18), 0 4px 8px rgba(0,0,0,0.08)',
        'game-indigo': '0 0 0 4px rgba(99,102,241,0.15), 0 4px 20px rgba(99,102,241,0.2)',
        'game-green': '0 0 0 4px rgba(16,185,129,0.15), 0 4px 20px rgba(16,185,129,0.2)',
        'game-orange': '0 0 0 4px rgba(249,115,22,0.15), 0 4px 20px rgba(249,115,22,0.2)',
        'btn-3d': '0 4px 0 0 rgba(0,0,0,0.18)',
        'btn-3d-sm': '0 3px 0 0 rgba(0,0,0,0.15)',
        // Legacy
        'glow-cyan': '0 0 20px -3px rgba(99,102,241,0.3)',
        'glow-green': '0 0 20px -3px rgba(16,185,129,0.3)',
        'glow-coral': '0 0 20px -3px rgba(239,68,68,0.3)',
        'card-industrial': '0 2px 8px rgba(99,102,241,0.08)',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'spin-slow': 'spinSlow 4s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop-in': 'popIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'liquid': 'liquidRise 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        // Legacy
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        liquidRise: {
          '0%, 100%': { transform: 'scaleY(0.97)' },
          '50%': { transform: 'scaleY(1.03)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        // Legacy
        conveyor: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(32px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
