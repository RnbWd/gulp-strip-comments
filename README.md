# [gulp](http://gulpjs.com)-strip-comments [![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments) [![Dependency Status](https://img.shields.io/david/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://david-dm.org/RnbWd/gulp-strip-comments)

> [decomment v4.x](https://github.com/vitaly-t/decomment/tree/v.0.4.2) - Removes comments from JSON, JavaScript, CSS and HTML.

[![NPM](https://nodei.co/npm-dl/gulp-strip-comments.png)](https://nodei.co/npm/gulp-strip-comments/)

`v2.0.0`  has better overall coverage and more support for `angular`. Please look at [releases](https://github.com/RnbWd/gulp-strip-comments/releases) to see which methods from `v1.x` are depreciated.

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

This API differs from the original. Explicity set options.safe to *false* if you want to turn off this feature. See [decomment](https://github.com/vitaly-t/decomment/tree/v.0.4.2#api).

## License

MIT © [RnbWd](https://github.com/RnbWd)
