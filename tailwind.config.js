// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages//*.{js,ts,jsx,tsx,mdx}',
    './src/components//*.{js,ts,jsx,tsx,mdx}',
    './src/app//*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Gradient colors for easy access
        gradient: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          amber: '#f59e0b',
        }
      },
      backgroundImage: {
        // Custom gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-rainbow': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)',
      },
      animation: {
        // Custom animations
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'text-shimmer': 'text-shimmer 3s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px -10px #06b6d4' },
          'to': { boxShadow: '0 0 20px -10px #8b5cf6' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}