const {readFileSync, writeFileSync} = require('fs')
const {join} = require('path')

const posthtml = require('posthtml')
const postcss = require('posthtml-postcss')
const chokidar = require('chokidar')

const autoprefixer = require('autoprefixer')

const postcssPlugins = [
  autoprefixer({browsers: ['last 2 versions']})
]
const postcssOptions = {}
const filterType = /^text\/css$/

// Initialize watcher.
const watcher = chokidar.watch('./src/components/**/*.style.html', {
  persistent: true
})

// Something to use when events are received.
const log = console.log.bind(console)

const compile = sourcePath => {
  const html = readFileSync(sourcePath, 'utf8')
  const splittedPath = sourcePath.split('/')
  const normalizedPath = splittedPath.splice(0, splittedPath.length - 1).join('/')
  const correctPath = join(normalizedPath, 'style-module.html')

  posthtml([postcss(postcssPlugins, postcssOptions, filterType)])
    .process(html)
    .then(result => Promise.resolve(writeFileSync(correctPath, result.html, 'utf8')))
		.then(() => log(`>> Compiled: ${sourcePath}`))
}

// Add event listeners.
watcher
  .on('add', sourcePath => log(`File ${sourcePath} has been added`))
  .on('change', sourcePath => compile(sourcePath))
  .on('unlink', sourcePath => log(`File ${sourcePath} has been removed`))

