# ci

## Installation

```bash
npm install --save-dev abc
```

## Usage

```javascript
var ci = require('ci');
var gulp = require('gulp');

gulp.task('lint', function (done) {
  gulp.src('./**/*').pipe(ci()).pipe(/* call done() */);
});
```

Now you run all your project files through the appropriate linters:

```bash
gulp lint
```

Or from JavaScript:

```javascript
gulp.run('lint');
```
