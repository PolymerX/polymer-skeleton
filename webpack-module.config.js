const {resolve} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * === ENV configuration
 */
const outputPath = resolve('dist');
const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));

/**
 * Plugin configuration
 */
const plugins = isDev ? [] : [
  new CleanWebpackPlugin([outputPath], {verbose: true})
];

/**
 * === Webpack configuration
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // We need to transpile Polymer itself and other ES6 code
        // exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              'env',
              {
                targets: {browsers: ['last 2 Chrome versions', 'Safari 10']},
                debug: true
              }
            ]]
          }
        }
      }
    ]
  },
  plugins
};
