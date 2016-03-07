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

The library does not support mixed content - HTML with JavaScript or CSS in it.
Once the input code is recognized as HTML, only the HTML comments will be removed from it. More information can be found in the [Decomment](https://github.com/vitaly-t/decomment) repo.

## Performance

For JSON and JavaScript this library uses [esprima] to guarantee correct processing for regular expressions.

As an example, it can process [AngularJS 1.5 Core](https://code.angularjs.org/1.5.0-rc.0/angular.js)
in under 100ms, which is 1.1MB ~ 30,000 lines of JavaScript.

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

See [decomment](https://github.com/vitaly-t/decomment#api) for examples and more information.

### strip(options)

##### options.safe ⇒ Boolean

* `false (default)` - remove all multi-line comments
* `true` - keep special multi-line comments that begin with:
 - `<!--[if` - for conditional comments in HTML
 - `/*!` - for everything else (other than HTML)

##### options.space ⇒ Boolean

* `false (default)` - remove comment blocks entirely
* `true` - replace comment blocks with white spaces where needed, in order to preserve the original line + column position of every code element.

NOTE: When this option is enabled, option `trim` is ignored.

##### options.trim ⇒ Boolean

* `false (default)` - do not trim comments
* `true` - remove empty lines that follow removed full-line comments

NOTE: This option has no effect when option `space` is enabled.

#### strip.text(options) ⇒ String

Unlike the default **strip** method, it instructs the library that `text` is not a JSON,K avaScript or HTML, rather a plain text that needs no parsing or validation, only to remove `//` and `/**/` comments from it according to the `options`.

This method is good for any text file that uses syntax `//` and `/**/` for comments, such as: `.CSS`, `.CPP`, `.H`, etc.

Please note that while the same rules apply for the text blocks (`''`, `""` and \`\`), you should not use this method for JSON or JavaScript, as it can break your regular expressions.

#### strip.html(options) ⇒ String

Unlike the default **strip** method, it instructs the library not to parse
or validate the input in any way, rather assume it to be HTML, and remove all
`<!-- comment -->` entries from it according to the `options`.


## License

MIT © [RnbWd](https://github.com/RnbWd)
