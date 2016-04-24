'use strict'
var gulp = require('gulp');
var runSequence = require('run-sequence');
var plugins = require('../plugins');
var config = require('../config');

gulp.task('compile_js', function() {
  var closureOpts = {
    compilerPath: './bower_components/closure-compiler/compiler.jar',
    compilerFlags: {
        angular_pass: true,
        closure_entry_point: 'scaffold',
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        generate_exports: true,
        manage_closure_dependencies: true,
        only_closure_dependencies: true,
        output_wrapper: '(function(){%output%})();',
        js: [
            './bower_components/closure-library/closure/**.js',
            './bower_components/closure-library/third_party/**.js',
            '!**_test.js'
        ]
    },
    maxBuffer: 800000, // Set maxBuffer to .8GB 
    fileName: 'build.min.js'
  };

  var vendor_externs = plugins.filenames.get('vendor_externs');

  if (!Array.isArray(vendor_externs)) {
    vendor_externs = [vendor_externs];
  }

  vendor_externs = vendor_externs.map(function(path) {
    var bower = config.Path.BOWER_FOLDER;
    if (!/\/$/.test(bower)) {
        bower += '/';
    }
    return bower + path; 
  });

  var externs = [];
  externs.concat(plugins.filenames('closure_externs'));
  externs.concat(vendor_externs);

  closureOpts.compilerFlags.externs = externs

  return gulp.src(config.Path.JS_SOURCES)
    .pipe(plugins.closureCompiler(closureOpts))
    .pipe(gulp.dest(config.Path.JS_TEMP_DIR))
});

gulp.task('minify_js', function() {
  return gulp.src([
    config.Path.JS_TEMP_DIR + 'vendor.min.js',
    config.Path.JS_TEMP_DIR + 'build.min.js'
  ])
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.Path.JS_OUT_DIR));
});

gulp.task('build_js', function(callback) {
  return runSequence(
      'build_deps',
      'compile_js',
      'minify_js',
      callback);
});

gulp.task('closure_externs', function() {
    return gulp.src(config.Path.CLOSURE_EXTERNS)
        .pipe(plugins.filenames('closure_externs'))
})

gulp.task('build_deps', ['closure_externs'], function() {
  var filterJs = plugins.filter(['**/*.js', '!**/*.min.js'], { restore: true });
  return gulp.src('./bower.json')
    .pipe(plugins.bower({base: './bower_components/'}))
    .pipe(filterJs)
    .pipe(plugins.filenames('vendor_externs'))
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(filterJs.restore)
    .pipe(gulp.dest(config.Path.JS_TEMP_DIR));
});
