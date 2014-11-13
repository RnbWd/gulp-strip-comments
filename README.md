# [gulp](http://gulpjs.com)-strip-comments [![Build Status](https://travis-ci.org/rnbwd/gulp-strip-comments.svg?branch=master)](https://travis-ci.org/rnbwd/gulp-strip-comments)

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

See [strip-comment](https://github.com/jonschlinkert/strip-comments#usage). **This API differs from the original in that options.safe defaults to _true_ if not specified.** To turn safe mode off, set options.safe as false.

#### options.line

Type: `boolean`  
Default: `false`

Enable [strip-comments .line](https://github.com/jonschlinkert/strip-comments#line).

#### options.block

Type: `boolean`  
Default: `false`

Enable [strip-comments .block](https://github.com/jonschlinkert/strip-comments#block).


## License

MIT © [RnbWd](https://github.com/RnbWd)