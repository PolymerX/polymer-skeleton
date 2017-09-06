const {resolve} = require('path');
const PostcssPolymerWebpackPlugin = require('./scripts/postcss-polymer-webpack-plugin');

const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const outputPath = isDev ? resolve('src') : resolve('dist');
const plugins = isDev ? [
  new PostcssPolymerWebpackPlugin()
] : [];

module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['text-loader', 'postcss-html-loader']
      }
    ]
  },
  plugins,
  devServer: {
    contentBase: resolve(outputPath),
    compress: true,
    overlay: {
      errors: true
    },
    port: 3000,
    host: 'localhost'
  }
};
