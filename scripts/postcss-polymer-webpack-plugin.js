'use strict';

const path = require('path');

const chokidar = require('chokidar');
const touch = require('touch');

const getHtmlFilePath = (sourcePath, htmlFile) => sourcePath.replace(path.basename(sourcePath), htmlFile);

function PostcssPolymerPlugin(options) {
  this.htmlFileName = options ? options.htmlFileName : 'template.html';
  this.componentsPath = options ? options.componentsPath : path.join('.', 'src', 'components');
}

PostcssPolymerPlugin.prototype.apply = function () {
  // Something to use when events are received.
  const log = console.log.bind(console);
  const componentsPath = this.componentsPath;
  const htmlFileName = this.htmlFileName;

  // Initialize watcher.
  const watcher = chokidar.watch(path.join(componentsPath, '**', '*.postcss'), {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100
    }
  });

  // Add event listeners.
  watcher
    .on('add', sourcePath => log(`PostCSS Watcher: file ${sourcePath} has been added`))
    .on('change', sourcePath => touch(getHtmlFilePath(sourcePath, htmlFileName)))
    .on('unlink', sourcePath => log(`PostCSS Watcher: File ${sourcePath} has been removed`));
};

module.exports = PostcssPolymerPlugin;
