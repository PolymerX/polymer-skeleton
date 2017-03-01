const { readFileSync, writeFileSync } = require('fs')

const posthtml = require('posthtml')
const postcss = require('posthtml-postcss')
const chokidar = require('chokidar')

const postcssPlugins = [
  require('autoprefixer')({ browsers: ['last 2 versions'] })
]
const postcssOptions = {}
const filterType = /^text\/css$/

// Initialize watcher.
const watcher = chokidar.watch('./src/components/**/*.postcss.html', {
  ignored: /(^|[\/\\])\../,
  persistent: true
})

// Something to use when events are received.
const log = console.log.bind(console)

const compile = path => {
	const html = readFileSync(path, 'utf8')
	const normalizedPath = path.replace('.postcss', '.style')

	posthtml([ postcss(postcssPlugins, postcssOptions, filterType) ])
    .process(html)
    .then(result => Promise.resolve(writeFileSync(normalizedPath, result.html, 'utf8')))
		.then(() => log(`>> Compiled: ${path}`))
}

// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => compile(path))
  .on('unlink', path => log(`File ${path} has been removed`))








