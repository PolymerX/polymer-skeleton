const {readFileSync} = require('fs')
const {join} = require('path')

const replace = require('replace-in-file')
const chokidar = require('chokidar')

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const postcssPlugins = [
  autoprefixer,
  cssnano()
]
// const postcssOptions = {}
// const filterType = /^text\/css$/

// Initialize watcher.
const watcher = chokidar.watch('./src/components/**/*.postcss', {
  persistent: true
})

// Something to use when events are received.
const log = console.log.bind(console)

const replaceHtml = (path, css) => {
  return replace({
    files: path,
    from: /<style>((.|\n)*)<\/style>/,
    to: `<style>
        ${css}
      </style>`
  })
}

const compile = sourcePath => {
  const css = readFileSync(sourcePath, 'utf8')
  const splittedPath = sourcePath.split('/')
  const normalizedPath = splittedPath.splice(0, splittedPath.length - 1).join('/')
  const htmlPath = join(normalizedPath, 'style-module.html')

  postcss(postcssPlugins)
    .process(css)
    .then(cssRes => replaceHtml(htmlPath, cssRes))
		.then(compileFiles => log(`>> Compiled: ${sourcePath} -> ${compileFiles}`))
    .catch(err => console.error(`! ERR: ${err}`))
}

// Add event listeners.
watcher
  .on('add', sourcePath => log(`File ${sourcePath} has been added`))
  .on('change', sourcePath => compile(sourcePath))
  .on('unlink', sourcePath => log(`File ${sourcePath} has been removed`))

