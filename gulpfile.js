var gulp = require('gulp');
var wrench = require('wrench');

/**
 * This will load all js or coffee files in the gulp directory
 * in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('build', ['build_js', 'sass']);
gulp.task('default', ['build_js', 'sass', 'watch']);
