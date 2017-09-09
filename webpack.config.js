const {resolve, join} = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * === ENV configuration
 */
const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const outputPath = isDev ? resolve('src') : resolve('dist');

/**
 * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    to: join(outputPath, 'vendor'),
    flatten: true
  },
  copyOthers: [{
    from: resolve('./src/index.html'),
    to: outputPath,
    flatten: true
  }, {
    from: resolve('./src/assets/**'),
    to: join(outputPath, 'assets'),
    flatten: true
  }, {
    from: resolve('./src/manifest.json'),
    to: outputPath,
    flatten: true
  }]
};

/**
 * Plugin configuration
 */
const plugins = isDev ? [
  new CopyWebpackPlugin([copyStatics.copyWebcomponents])
] : [
  new WorkboxPlugin({
    globDirectory: outputPath,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: join(outputPath, 'sw.js')
  }),
  new CopyWebpackPlugin(
    [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  ),
  new CleanWebpackPlugin([outputPath], {verbose: true})
];

/**
 * === Webpack configuration
 */
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
        use: ['text-loader']
      },
      {
        test: /\.postcss$/,
        use: ['text-loader', 'postcss-loader']
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
