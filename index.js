'use strict';
var through = require('through2');
var eslint = require('gulp-eslint');
var docco = require('gulp-docco');
var rimraf = require('rimraf');

// ## Tasks
function update (callback) {
  // Update outdated npm modules
  var exec = require('child_process').exec;
  exec('npm-update-outdated', callback);
}

function cleanDocumentation (callback) {
  // Remove previous generated documentation
  rimraf('./documentation/generated', callback);
}

// ## Streams
function lint (options) {
  // Create a eslint stream to use in a gulp task
  return through.obj(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}
	
function document (dest) {
  // Create a docco stream to generate documentation and pipe to the given dest
  return through.obj(docco())
    .pipe(dest);
}
  
module.exports = {
  cleanDocumentation: cleanDocumentation,
  document: document,
  lint: lint,
  update: update
};

