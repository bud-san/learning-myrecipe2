import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ec3713',
        'background-light': '#f8f6f6',
        'background-dark': '#221310',
        surface: '#ffffff',
        'surface-dark': '#2f1f1c',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Noto Sans JP', 'sans-serif'],
        body: ['Noto Sans JP', 'sans-serif'],
      },
      borderRadius: {
        xl: '2rem',
      },
    },
  },
} satisfies Config
