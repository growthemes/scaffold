'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const config = require('../config');

gulp.task('sass', function() {
  return gulp.src(config.Path.CSS_SOURCES)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest(config.Path.CSS_OUT_DIR));
});
