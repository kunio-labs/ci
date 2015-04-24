// # Gulpfile — automate development tasks.
'use strict';

// ## Dependencies
var gulp = require('gulp');
var ci = require('./index.js');

// ## Paths
var paths = {
  javascript: './**/*.js',
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
  var dest = gulp.dest('./documentation/generated');
  gulp.src([ paths.javascript ])
    .pipe(ci.document(dest));
});

// Delete generated documentation.
gulp.task('clean.documentation', ci.cleanDocumentation);

// Run linters.
gulp.task('lint', function () {
  gulp.src([ paths.javascript ])
    .pipe(ci.lint());
});

// Update outdated npm modules
gulp.task('update', ci.update);

