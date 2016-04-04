'use strict'
var gulp = require('gulp');
var config = require('./config');
var plugins = require('./plugins');

gulp.task('sass', function() {
  return gulp.src(config.Path.CSS_SOURCES)
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
        outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.Path.CSS_OUT_DIR));
});