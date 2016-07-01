js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline
      files: [
        'assets/js/*.js'
        'assets/js/*.coffee'
        'bower_components/ng-file-upload/ng-file-upload-shim.js'
        'bower_components/ng-file-upload/ng-file-upload.js'
        'bower_components/angular-cloudinary/angular-cloudinary.js'
      ]
    css_pipeline(files: 'assets/css/*.scss')
  ]

  scss:
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
