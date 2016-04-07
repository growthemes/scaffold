'use strict';
var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch([config.Path.CSS_SOURCES], ['sass']);
  gulp.watch(config.Path.JS_SOURCES, ['build_js']);
  gulp.watch(['./bower_components'], ['build_deps']);
});
