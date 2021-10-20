module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: '#485F95',
        secondary: '#1D3A5F',
        dark: '#1B2232',
        white: '#FFF',
        gray1: '#747D92',
        gray2: '#BCC1D9',
        gray3: '#E1E3EB',
        gray4: '#EFF4FF',
        gray5: '#F8F8FA',
      },
     },
    fontSize: {
      '2xs': ['10px', '12px'],
      xs: ['12px', '15px'],
      sm: ['14px', '17px'],
      tiny: ['16px', '23px'],
      base: ['18px', '26px'],
      lg: ['22px', '27px'],
      xl: ['24px', '29px'],
      '2xl': ['28px', '34px'],
      '3xl': ['32px', '39px'],
      '4xl': ['40px', '49px'],
      '5xl': ['48px', '59px'],
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }