'use strict'
var gulp = require('gulp');
var runSequence = require('run-sequence');
var plugins = require('../plugins');
var config = require('../config');

gulp.task('compile_js', function() {
  return gulp.src(config.Path.JS_SOURCES).pipe(plugins.closureCompiler({
    compilerPath: './bower_components/closure-compiler/compiler.jar',
    compilerFlags: {
        'angular_pass': true,
        'closure_entry_point': 'scaffold',
        'compilation_level': 'SIMPLE_OPTIMIZATIONS',
        'externs': [
            './bower_components/closure-compiler-src/contrib/externs/angular-1.3.js',
            './bower_components/closure-compiler-src/contrib/externs/google_youtube_iframe.js',
            './bower_components/closure-compiler-src/contrib/externs/maps/google_maps_api_v3_exp.js',
            './source/externs.js'
        ],
        'generate_exports': true,
        'manage_closure_dependencies': true,
        'only_closure_dependencies': true,
        'output_wrapper': '(function(){%output%})();',
        'js': [
            './bower_components/closure-library/closure/**.js',
            './bower_components/closure-library/third_party/**.js',
            '!**_test.js'
        ]
    },
    fileName: 'build.min.js'
  }))
    .pipe(gulp.dest(config.Path.JS_TEMP_DIR))
});

gulp.task('minify_js', function() {
  return gulp.src([
    config.Path.JS_TEMP_DIR + 'build.min.js'
  ])
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.Path.JS_OUT_DIR));
});

gulp.task('build_js', function(callback) {
  return runSequence(
      'compile_js',
      'minify_js',
      'build_deps',
      callback);
});

gulp.task('build_deps', function() {
  var filterJs = plugins.filter(['**/*.js', '!**/*.min.js'], { restore: true });
  return gulp.src('./bower.json')
    .pipe(plugins.bower())
    .pipe(filterJs)
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(filterJs.restore)
    .pipe(gulp.dest(config.Path.JS_OUT_DIR));
});
