export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          'surface-hover': '#F4F4F5',
          border: '#E4E4E7',
          primary: '#2B2B2B',
          muted: '#6B7280',
          accent: '#FF6F61',
          'accent-hover': '#F45A4C',
          'accent-text': '#000000',
        },
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        'surface-hover': '#F4F4F5',
        accent: '#FF6F61',
        'accent-hover': '#F45A4C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'sans-serif'],
      },
      borderRadius: {
        theme: '16px',
      },
    },
  },
  plugins: [],
};