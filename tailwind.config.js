/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        accent: '#FF6B6B',
        'accent-dark': '#E55A5A',
        'dark-lighter': '#1A1A1A',
        'dark-darker': '#0A0A0A',
        dark: {
          DEFAULT: "#0b0f19",
          lighter: "#1a1f2e",
        },
        light: {
          DEFAULT: "#ffffff",
          darker: "#f3f4f6",
        },
        text: {
          dark: "#e2e8f0",
          light: "#1f2937",
        },
        "accent-secondary": "#f87171",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
} 