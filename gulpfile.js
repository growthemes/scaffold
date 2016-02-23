var autoprefixer = require('gulp-autoprefixer');
var closureCompiler = require('gulp-closure-compiler');
var concat = require('gulp-concat');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');


var Path = {
  CSS_SOURCE_DIR: './source/sass/',
  CSS_SOURCES: './source/sass/*',
  CSS_OUT_DIR: './dist/css/',
  JS_OUT_DIR: './dist/js/',
  JS_TEMP_DIR: './bower_components/',
  JS_SOURCES: [
    './source/js/**/*.js',
  ]
};


gulp.task('sass', function() {
  return gulp.src('./source/sass/*.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(Path.CSS_OUT_DIR));
});


gulp.task('compile_js', function() {
  return gulp.src(Path.JS_SOURCES).pipe(closureCompiler({
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
            './source/js/**.js',
            '!**_test.js'
        ]
    },
    fileName: 'build.min.js'
  }))
    .pipe(gulp.dest(Path.JS_TEMP_DIR))
});


gulp.task('minify_js', function() {
  return gulp.src([
    Path.JS_TEMP_DIR + 'build.min.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(Path.JS_OUT_DIR));
});


gulp.task('build_js', function(callback) {
  return runSequence(
      'compile_js',
      'minify_js',
      callback);
});


gulp.task('watch', function() {
  gulp.watch([Path.CSS_SOURCES], ['sass']);
  gulp.watch(Path.JS_SOURCES, ['build_js']);
});


gulp.task('build', ['build_js', 'sass']);
gulp.task('default', ['build_js', 'sass', 'watch']);
