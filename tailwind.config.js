/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'soft-red': 'hsl(358, 79%, 66%)',
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'very-light-gray': 'hsl(228, 33%, 97%)', //site background
        'white': 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      fontSize: {
        paragraph: '16px',
      },
    },
  },
  plugins: [],
}