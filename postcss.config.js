module.exports = () => ({
  plugins: {
    'postcss-easy-import': {
      extensions: [
        '.pcss',
        '.css',
        '.postcss',
        '.sss'
      ]
    },
    'stylelint': {
      configFile: '.stylelintrc'
    },
    'postcss-mixins': {},
    'postcss-nesting': {},
    'postcss-custom-media': {},
    'postcss-selector-not': {},
    'postcss-discard-comments': {},
    'autoprefixer': {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not ie <= 11'
      ]
    },
    'cssnano': {
      preset: 'default'
    },
    'postcss-reporter': {
      clearReportedMessages: true,
      noPlugin: true
    }
  }
});
