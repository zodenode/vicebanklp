/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Sora', 'sans-serif'],
      },
      colors: {
        ink: '#0b1c24',
        meridian: '#1f6f78',
        brass: '#a8894e',
        mist: '#e7eef1',
        paper: '#f3f7f8',
      },
    },
  },
  plugins: [],
}
