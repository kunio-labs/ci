// # Gulpfile — automate development tasks.
'use strict';
// ## Dependencies
var gulp = require('gulp');
var es = require('event-stream');

// Show more error detail.
gulp.onAll(function (e) {
  if (!e.err) return;
  console.log(e.err.stack);
});
process.on('uncaughtException', function (error) {
  console.log(error);
});

// Call the callback when the piped stream ends.
function done (callback) {
  return es.through(null, function () {
    this.emit('end');
    callback(null);
  });
}

// ## Tasks
// Generate source code documentation.
gulp.task('document', ['clean.documentation'], function () {
  var docco = require('gulp-docco');
  gulp.src('./**/*.js')
    .pipe(docco())
    .pipe(gulp.dest('./documentation/generated'));
});
// Delete generated documentation.
gulp.task('clean.documentation', function (callback) {
  var rimraf = require('rimraf');
  // Clean the build directory.
  rimraf('./documentation/generated', callback);
});
// Run linters.
gulp.task('lint', function () {
  var jshint = require('gulp-jshint');
  gulp.src([ paths.javascript, paths.exclude.npm, paths.exclude.build ])
    .pipe(jshint('./jshint.json'))
    .pipe(jshint.reporter('default'));
});
