'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const closureCompiler = require('gulp-closure-compiler');
const argv = require('yargs').argv;
const rimraf = require('rimraf');
const uglify = require('gulp-uglify');
const config = require('../config');

const ENV_PRODUCTION = argv.env == 'PROD';

gulp.task('compile_js', function() {

  const OPT_LEVEL = ENV_PRODUCTION ?
    'ADVANCED_OPTIMIZATIONS' :
    'SIMPLE_OPTIMIZATIONS';

  const closureOpts = {
    compilerPath: './bower_components/closure-compiler/closure-compiler-v20170124.jar',
    compilerFlags: {
      angular_pass: true,
      closure_entry_point: 'goog:app.bootstrap',
      compilation_level: OPT_LEVEL,
      output_wrapper: '(function(){%output%})();',
      generate_exports: true,
      export_local_property_definitions: true,
      js: [
        './bower_components/closure-library/closure/goog/base.js',
        '!**_test.js',
        '!**_spec.js'
      ],
      externs: [
        './bower_components/closure-compiler-src/contrib/externs/angular-1.6*.js'
      ]
    },
    maxBuffer: 800000, // .8GB
    fileName: 'main.min.js'
  };

  return gulp
    .src(config.Path.JS_SOURCES)
    .pipe(closureCompiler(closureOpts))
    .pipe(uglify())
    .pipe(gulp.dest(config.Path.JS_OUT_DIR));
});

gulp.task('clean', function(callback) {
  rimraf('./build', callback);
})

gulp.task('build_js', ['compile_js']);