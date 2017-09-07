const {resolve, join} = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PostcssPolymerWebpackPlugin = require('./scripts/postcss-polymer-webpack-plugin');

const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const outputPath = isDev ? resolve('src') : resolve('dist');
const plugins = isDev ? [
  new PostcssPolymerWebpackPlugin()
] : [
  new WorkboxPlugin({
    globDirectory: outputPath,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: join(outputPath, 'sw.js')
  })
];

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
