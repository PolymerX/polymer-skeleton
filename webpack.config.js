'use strict';

const {resolve, join} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const moduleConf = require('./webpack-module.config');
const nomoduleConf = require('./webpack-nomodule.config');

const ENV = process.argv.find(arg => arg.includes('NODE_ENV=production')) ? 'production' : 'development';
const IS_DEV_SERVER = process.argv.find(arg => arg.includes('webpack-dev-server'));
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('src') : resolve('dist');

const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

/**
 * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: [{
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }],
  copyOthers: [{
    from: 'assets/**',
    context: resolve('./src'),
    to: OUTPUT_PATH
  }, {
    from: resolve('./src/index.html'),
    to: OUTPUT_PATH,
    flatten: true
  }, {
    from: resolve('./src/manifest.json'),
    to: OUTPUT_PATH,
    flatten: true
  }]
};

/**
 * Plugin configuration
 */
const plugins = [IS_DEV_SERVER ?
  new CopyWebpackPlugin(copyStatics.copyWebcomponents) :
  new WorkboxPlugin({
    globDirectory: OUTPUT_PATH,
    globPatterns: ['**/!(*map*)'],
    globIgnores: ['**/sw.js'],
    swDest: join(OUTPUT_PATH, 'sw.js')
  }),
  new CopyWebpackPlugin(
    [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  )
].concat([
  new webpack.DefinePlugin({'process.env': processEnv})
]);

const shared = env => {
  const IS_MODULE_BUILD = env.BROWSERS === 'module';

  return {
    entry: './src/index.js',
    devtool: 'cheap-module-source-map',
    output: {
      path: OUTPUT_PATH,
      filename: IS_MODULE_BUILD ? 'module.bundle.js' : 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: ['text-loader']
        },
        {
          test: /\.pcss$/,
          use: ['text-loader', 'postcss-loader']
        }
      ]
    },
    plugins,
    devServer: {
      contentBase: OUTPUT_PATH,
      compress: true,
      overlay: {
        errors: true
      },
      port: 3000,
      host: '0.0.0.0',
      disableHostCheck: true
    }
  };
};

module.exports = (env = {}) => merge(env.BROWSERS === 'module' ? moduleConf() : nomoduleConf(), shared(env));
