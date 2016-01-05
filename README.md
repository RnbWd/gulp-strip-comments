# [gulp](http://gulpjs.com)-strip-comments

[![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments)
[![David](https://david-dm.org/rnbwd/gulp-strip-comments.svg)](https://david-dm.org/rnbwd/gulp-strip-comments)

> [decomment](https://github.com/vitaly-t/decomment/) - Removes comments from JSON, JavaScript, CSS, HTML, etc.

[![NPM](https://nodei.co/npm-dl/gulp-strip-comments.png)](https://nodei.co/npm/gulp-strip-comments/)

`v2.x`  has better overall coverage, bug fixes, and more support for `angular`. Please look at [releases](https://github.com/RnbWd/gulp-strip-comments/releases) to see which methods from `v1.x` are depreciated.

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

##### options.safe ⇒ Boolean
* `true (default)` - keep multi-line comments that start with `/*!`
* `false` - remove all multi-line comments

This API differs from the original. Explicity set options.safe to *false* if you want to turn off this feature. See [decomment](https://github.com/vitaly-t/decomment#api).

##### options.space ⇒ Boolean

* `false (default)` - remove comment blocks entirely
* `true` - replace comment blocks with white spaces where needed, in order to preserve the original line + column position of every code element.

NOTE: When this option is enabled, option `trim` is ignored.

##### options.trim ⇒ Boolean
* `false (default)` - do not trim comments
* `true` - remove empty lines that follow removed full-line comments

NOTE: This option has no effect when option `space` is enabled.

### strip.text([options]) ⇒ String

This method is good for any text file that uses syntax `//` and `/**/` for comments, such as: `.CSS`, `.CPP`, `.H`, etc.

Please note that while the same rules apply for the text blocks (`''`, `""` and \`\`), you should not use this method for JSON or JavaScript, as it can break your regular expressions.

### strip.html([options]) ⇒ String

Instructs the library not to parse or validate the input in any way, rather assume it to be HTML, and remove all `<!-- comment -->` entries from it according to the `options`.

## License

MIT © [RnbWd](https://github.com/RnbWd)
