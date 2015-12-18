# [gulp](http://gulpjs.com)-strip-comments [![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments) [![Dependency Status](https://img.shields.io/david/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://david-dm.org/RnbWd/gulp-strip-comments)

> [Strip-comments](https://github.com/jonschlinkert/strip-comments) from code. Removes both line comments and/or block comments, with options to leave protected comments unharmed.

[![NPM](https://nodei.co/npm-dl/gulp-strip-comments.png)](https://nodei.co/npm/gulp-strip-comments/)

*Issues with the output should be reported on the strip-comments [issue tracker](https://github.com/jonschlinkert/strip-comments/issues).*

** __Depreciated__ `v1.1.0` & `v1.1.1` **

run `npm install` and the non-breaking API package will be installed

*`gulp-strip-comments@1.1.2` === `gulp-strip-comments@1.0.2`*

The depreciated modules are flagged and npm will give a warning if 'v1.1.0' or 'v1.1.1' are installed. It's impossible to revert - so the default behavior for npm will be to install `v1.1.2` - which does not have any breaking changes and shouldn't require any changes in existing package.json files.

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

Enable [strip .line](https://github.com/jonschlinkert/strip-comments#line). Cannot be used concurrently with `block` or `first`

#### options.block

Type: `boolean`
Default: `false`

Enable [strip .block](https://github.com/jonschlinkert/strip-comments#block). Cannot be used concurrently with `line` or `first`

## License

MIT © [RnbWd](https://github.com/RnbWd)
