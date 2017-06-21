'use strict';

const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
      loaders: ['babel-loader', 'wc-loader', 'postcss-polymer-loader']
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // Browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // Proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3100/'
      },
      {
        // Prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
  ],
  devServer: {
    contentBase: path.resolve('src'),
    publicPath: '/',
    compress: true,
    port: 3100,
    watchContentBase: true,
    watchOptions: {
      // Bower files and postcss ignored, reload when "style-module.html" is compiled(modified)
      // ignored: ['src/assets/bower/**/*', 'src/components/**/*.postcss'],
      poll: true
    },
    hot: true,
    inline: true
  }
};
