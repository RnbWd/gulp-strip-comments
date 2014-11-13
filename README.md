# [gulp](http://gulpjs.com)-strip-comments [![Build Status](https://travis-ci.org/RnbWd/gulp-strip-comments.svg)](https://travis-ci.org/RnbWd/gulp-strip-comments)

> [Strip-comments](https://github.com/jonschlinkert/strip-comments) from code. Removes both line comments and/or block comments, with options to leave protected comments unharmed.

*Issues with the output should be reported on the strip-comments [issue tracker](https://github.com/jonschlinkert/strip-comments/issues).*


## Install

```sh
$ npm install --save-dev gulp-strip-comments
```

## Usage

```js
var gulp = require('gulp');
var strip = require('gulp-strip-comments');

gulp.task('default', function () {
  return gulp.src('template.js')
    .pipe(strip())
    .pipe(gulp.dest('dist'));
});
```

## API

### strip(options)

#### options.safe

Type: `boolean`  
Default: `true`

This API differs from the original. Explicity set options.safe to *false* if you want to turn off this feature. See [strip-comments](https://github.com/jonschlinkert/strip-comments#usage).

#### options.line

Type: `boolean`  
Default: `false`

Enable [strip .line](https://github.com/jonschlinkert/strip-comments#line). Cannot be used concurrently with [options.block](https://github.com/RnbWd/gulp-strip-comments#optionsblock).

#### options.block

Type: `boolean`  
Default: `false`

Enable [strip .block](https://github.com/jonschlinkert/strip-comments#block). Cannot be used concurrently with [options.line](https://github.com/RnbWd/gulp-strip-comments#optionsline).


## License

MIT © [RnbWd](https://github.com/RnbWd)