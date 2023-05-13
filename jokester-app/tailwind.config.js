module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      margin: {
        320: '320px',
      },
      width: {
        190: '190px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        656: '656px',
        880: '880px',
        508: '508px',
        'SignUpNormal': '55px',
        'SignUpExtend': '200px'
      },
      height: {
        80: '80px',
        340: '340px',
        370: '370px',
        420: '420px',
        510: '510px',
        600: '600px',
        685: '685px',
        800: '800px',
        '90vh': '90vh',
      },
      transitionDuration: {
        'SignUpTransTime': '300ms'
      },
      transitionTimingFunction: {
        'SignUpEasing': 'ease-out'
      },
      rotate: {
        'm45': '-45deg'
      },
      flex: {
        0.7: '0.7 1 0%',
      },
      maxHeight: {
        370: '370px',
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px',
      },
      backgroundColor: {
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      animation: {
        slidedown: 'slidedown 0.35s ease-in-out',
        slideup: 'slideup 0.35s ease-in-out',
      },
      keyframes: {
        slidedown: {
          from: { transform: 'translateY(500px)' },
          to: { transform: 'translateY(0px)' },
        },

        slideup: {
          from: { transform: 'translateY(-500px)' },
          to: { transform: 'translateY(0px)' },
        },
      },

      transitionProperty: {
        height: 'height',
      },
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer',
    },
  },
  variants: {
    // backgroundColor: ['active'],
    extend: {},
  },
  plugins: [],
};
