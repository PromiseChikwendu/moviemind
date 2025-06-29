/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#E50914', // Netflix-inspired red
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#564D4A', // warm charcoal
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#FFD700', // premium gold
        'accent-foreground': '#0F0F0F', // deep black
        
        // Background Colors
        'background': '#0F0F0F', // deep black
        'surface': '#1A1A1A', // elevated dark surface
        
        // Text Colors
        'text-primary': '#FFFFFF', // pure white
        'text-secondary': '#B3B3B3', // muted gray
        
        // Status Colors
        'success': '#46D369', // fresh green
        'success-foreground': '#FFFFFF', // white
        
        'warning': '#FF9500', // amber orange
        'warning-foreground': '#FFFFFF', // white
        
        'error': '#FF453A', // vibrant red
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // subtle white border
        'border-muted': 'rgba(255, 255, 255, 0.05)', // very subtle border
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // headings
        'body': ['Source Sans Pro', 'sans-serif'], // body text
        'caption': ['Roboto', 'sans-serif'], // captions and metadata
        'mono': ['JetBrains Mono', 'monospace'], // data and numerical content
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-semibold': '600',
        'caption-normal': '400',
        'mono-normal': '400',
      },
      boxShadow: {
        'elevation-sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'elevation-md': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'elevation-lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-in-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}