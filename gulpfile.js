const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;


/**
 * This will load all js files in the gulp directory
 * in order to load all gulp tasks
 */
fs.readdirSync('./gulp/tasks').filter(function(file) {
  return (/\.js$/i).test(file);
}).map(function(file) {
  require('./gulp/tasks/' + file);
});

gulp.task('build', function(callback){
  runSequence('clean', ['build_js', 'sass'], callback)
});
gulp.task('default', ['build', 'watch']);
