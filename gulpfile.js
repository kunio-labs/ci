// # Gulpfile — automate development tasks.
'use strict';
// ## Dependencies
var gulp = require('gulp');
var es = require('event-stream');

// ## Paths
var paths = {
  javascript: './**/*.js',
  exclude: {
    build: 'build/**/*.js'
  },
};

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
  var eslint = require('gulp-eslint');
  gulp.src([ paths.javascript, paths.exclude.build ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
// Update outdated npm modules
gulp.task('update', function (callback) {
  var exec = require('child_process').exec;
  exec('npm-update-outdated', callback);
});

