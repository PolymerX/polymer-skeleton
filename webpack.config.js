'use strict';

const path = require('path');
const PostcssPolymerWebpackPlugin = require('./build_utils/postcss-polymer-webpack-plugin');

const isBuild = process.env.NODE_ENV === 'build';

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: isBuild ? path.resolve('./dist') : path.resolve('./src'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loaders: ['text-loader', 'postcss-html-loader']
    }]
  },
  plugins: [
    new PostcssPolymerWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve('src'),
    publicPath: '/',
    compress: true,
    port: 3000,
    watchOptions: {
      // Bower files and postcss ignored, reload when "style-module.html" is compiled(modified)
      // ignored: ['src/assets/bower/**/*', 'src/components/**/*.postcss'],
      poll: true
    }
  }
};
