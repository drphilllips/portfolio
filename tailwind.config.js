import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roylp: {
          DEFAULT: "#7851A9",
          50: "#D7CBE6",
          100: "#CDBEE0",
          200: "#B7A2D2",
          300: "#A286C5",
          400: "#8D6BB8",
          500: "#7851A9",
          600: "#5D3F83",
          700: "#422D5D",
          800: "#271A37",
          900: "#0C0811",
          950: "#000000",
        },
        chrtr: {
          DEFAULT: '#D1E25B',
          50: '#FDFEF7',
          100: '#F8FBE6',
          200: '#EEF4C3',
          300: '#E4EEA0',
          400: '#DBE87E',
          500: '#D1E25B',
          600: '#C4DA2B',
          700: '#9CAE1F',
          800: '#717E16',
          900: '#474F0E',
          950: '#31370A'
        },
        orngc: {
          DEFAULT: '#FFA472',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFF3EC',
          300: '#FFD9C4',
          400: '#FFBE9B',
          500: '#FFA472',
          600: '#FF803A',
          700: '#FF5C02',
          800: '#C94700',
          900: '#913300',
          950: '#752900'
        },
        palbr: {
          DEFAULT: '#947352',
          50: '#DDCFC1',
          100: '#D5C5B4',
          200: '#C7B09A',
          300: '#B89C7F',
          400: '#AA8765',
          500: '#947352',
          600: '#70573E',
          700: '#4C3B2A',
          800: '#281F16',
          900: '#040302',
          950: '#000000'
        },
        ghost: {
          DEFAULT: '#F8F8FF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F8F8FF',
          600: '#C0C0FF',
          700: '#8888FF',
          800: '#5050FF',
          900: '#1818FF',
          950: '#0000FB'
        },
        ashbl: {
          DEFAULT: '#1D1E1D',
          50: '#777B77',
          100: '#6D716D',
          200: '#595C59',
          300: '#454745',
          400: '#313331',
          500: '#1D1E1D',
          600: '#010101',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        // Background semantics
        ".bg-primary": { backgroundColor: theme("colors.ashbl.DEFAULT") },
        ".bg-secondary": { backgroundColor: theme("colors.ghost.DEFAULT") },

        // Text semantics (inverted)
        ".text-primary": { color: theme("colors.ghost.DEFAULT") },
        ".text-secondary": { color: theme("colors.ashbl.DEFAULT") },
      });
    }),
  ],
}