import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#0e0e0e',
          1: '#161616',
          2: '#1f1f1f',
          3: '#272727',
        },
        ink: {
          1: '#e8e8e6',
          2: '#8a8a85',
          3: '#505050',
        },
        green: {
          acc: '#4ade80',
          bar: '#22c55e',
          dim: 'rgba(74,222,128,0.12)',
          dimhover: 'rgba(74,222,128,0.18)',
        },
      },
      fontFamily: {
        sans: ["'Geist'", 'system-ui', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1.4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
