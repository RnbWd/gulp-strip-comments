# [gulp](http://gulpjs.com)-strip-comments

[![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments)
[![Coverage Status](https://coveralls.io/repos/RnbWd/gulp-strip-comments/badge.svg?branch=master&service=github)](https://coveralls.io/github/RnbWd/gulp-strip-comments?branch=master)
[![npm](https://img.shields.io/npm/v/gulp-strip-comments.svg?style=flat-square)](https://www.npmjs.com/package/gulp-strip-comments)
[![David](https://david-dm.org/rnbwd/gulp-strip-comments.svg)](https://david-dm.org/rnbwd/gulp-strip-comments)
[![npm](https://img.shields.io/npm/dt/gulp-strip-comments.svg?style=flat-square)](https://www.npmjs.com/package/gulp-strip-comments)


> [decomment](https://github.com/vitaly-t/decomment/) - Removes comments from JSON, JavaScript, CSS, HTML, etc.

[![NPM](https://nodei.co/npm-dl/gulp-strip-comments.png)](https://nodei.co/npm/gulp-strip-comments/)

## Features

* Removes both single and multi-line comments from JSON, JavaScript and CSS/Text
* Automatically recognizes HTML and removes all `<!-- comments -->` from it
* Does not change layout / formatting of the original document
* Removes lines that have only comments on them
* Compatible with CSS3, JSON5 and ECMAScript 6

This library does not support mixed content - HTML with JavaScript or CSS in it.
Once the input code is recognized as HTML, only the HTML comments will be removed from it. More information can be found in the [Decomment](https://github.com/vitaly-t/decomment) repo.

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

Unlike the default method, it instructs the library not to parse or validate the input in any way, rather assume it to be HTML, and remove all <!-- comment --> entries from it according to the `options`.

## License

MIT © [RnbWd](https://github.com/RnbWd)
