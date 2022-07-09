module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: (arg) => {
        return 37.5
        // return arg.file.includes('vant') ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
