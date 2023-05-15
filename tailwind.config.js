module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          'gold_main': '#ebbc00',
          'lightgold_main': '#e0c24a',
          'navy_main': '#06253f',
          'bronze_main': '#daaa00',
          'gray_main': '#f8f9fd',
          'copper_main': '#a6813d',
          'charcoal_main': '#464444',
          'darknavy_main': '#03101A'
         },
         fontFamily: {
          'noto-sans': ['"Noto Sans"'],
        },
      },
    },
    plugins: [],
  }