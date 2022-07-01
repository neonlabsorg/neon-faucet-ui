module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': {
        min: '0px',
        max: '639px'
      },
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      width: {
        '18px': '18px'
      },
      maxWidth: {
        '420px': '420px',
        '1040px': '1040px'
      },
      maxHeight: { 
        '3/4': '75%'
      },
      height: {
        '18px': '18px',
        '64px': '64px'
      },
      colors: {
        'ocean-blue': 'rgba(94,118,153, 0.15)',
        'light-gray': '#F3F6FD',
        'light-gray-op25': 'rgba(243,246,253, 0.25)',
        'pinky-white': '#F7F8FF',
        'blue-main': "#4355F9",
        'grey': '#979AAC',
        'error-red': '#ff0000',
        'green': '#14F195',
        'light-blue': 'rgba(67, 85, 249, 0.35)',
        'black': '#151515',
        'snowy': 'rgba(216, 236, 255, 0.72)',
        'light-100': '#E2E6EA',
        'dark-600': '#1F1A25',
        'dark-hover-inputs': '#312D39',
        'dark-500': '#303030',
        'dark-300': '#616163',
        'dark-200': '#5B5B5B',
        'op-15-black': 'rgba(0, 0, 0, 0.15)',
        'op04-white': 'rgba(255, 255, 255, 0.04)',
        'op15-white': 'rgba(255, 255, 255, 0.15)',
        
      }
    },
    stroke: {
      'white': '#fff',
      'black': '#151515',
      'green': '#14F195',
      'red': '#ff0000'
    },
    fill: {
      'white': '#fff',
      'black': '#151515',
      'green': '#14F195',
      'red': '#ff0000'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
 }