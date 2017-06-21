const {basename} = require('path');

const chokidar = require('chokidar');
const touch = require('touch');

const arg = process.argv.find(arg => arg.includes('--file='));
const htmlFileName = arg ? arg.replace('--file=', '') : 'template.html';

// Something to use when events are received.
const log = console.log.bind(console);

// Initialize watcher.
const watcher = chokidar.watch('./src/**/*.postcss', {
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
});

// Add event listeners.
watcher
  .on('add', sourcePath => log(`PostCSS Watcher: file ${sourcePath} has been added`))
  .on('change', sourcePath => touch(sourcePath.replace(basename(sourcePath), htmlFileName)))
  .on('unlink', sourcePath => log(`PostCSS Watcher: File ${sourcePath} has been removed`));

