/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './node_modules/@nuxt/ui/dist/**/*.{mjs,js,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f8f1',
          100: '#e3f1e3',
          200: '#c7e3c7',
          300: '#9acf9a',
          400: '#6eb66e',
          500: '#4CAF50',  // Основной цвет из _variables.scss
          600: '#45a049',  // Hover цвет из _variables.scss
          700: '#3a8c39',
          800: '#316e31',
          900: '#2c5c2b',
          950: '#15311c',
        },
        error: '#F44336',
        info: '#2196F3',
        warning: '#FF9800',
        success: '#4CAF50',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 