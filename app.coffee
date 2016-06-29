js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(files: ['assets/js/*.js', 'assets/js/*.coffee']),
    css_pipeline(files: 'assets/css/*.scss')
  ]

  scss:
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
