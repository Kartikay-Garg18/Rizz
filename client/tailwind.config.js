const { all } = require("axios");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'zoom-in': 'zoomIn 1s ease-in-out',
        'slide-in': 'slideIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      colors: {
        dark: {
          background: '#1a202c',
          text: '#ffffff',
        },
        retro: {
          background: '#fdf6e3',
          text: '#657b83',
        },
      },
      fontFamily: {
        'pop': ["Poppins", "sans-serif"],
      },
      rotate: {
        '15': '15deg',
      },
      backgroundImage: {
        'noise': "url('https://www.reactbits.dev/assets/noise.png')",
      }
    },
  },
  plugins: [addVariablesForColors, require('daisyui')],
  daisyui: {
    themes: all
  }
};

function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}