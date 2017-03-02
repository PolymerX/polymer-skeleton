const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve('src/assets/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015'
    }]
  },
  devServer: {
    contentBase: path.resolve('src'),
    publicPath: '/assets/js',
    compress: true,
    port: 3000
  }
}
