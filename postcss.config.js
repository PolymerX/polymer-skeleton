module.exports = () => ({
  plugins: [
    require('postcss-easy-import')({
      extensions: [
        '.pcss',
        '.css',
        '.postcss',
        '.sss'
      ]
    }),
    require('stylelint')({
      configFile: '.stylelintrc'
    }),
    require('postcss-mixins'),
    require('postcss-nesting'),
    require('postcss-custom-media'),
    require('postcss-selector-not'),
    require('postcss-discard-comments'),
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not ie <= 11'
      ]
    }),
    require('cssnano')({
      preset: 'default'
    }),
    require('postcss-reporter')({
      clearReportedMessages: true,
      noPlugin: true
    })
  ]
});
