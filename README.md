# [gulp](http://gulpjs.com)-strip-comments

[![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments)
[![Coverage Status](https://coveralls.io/repos/RnbWd/gulp-strip-comments/badge.svg?branch=master&service=github)](https://coveralls.io/github/RnbWd/gulp-strip-comments?branch=master)
[![downloads](https://img.shields.io/npm/dt/gulp-strip-comments.svg?style=flat-square)](https://www.npmjs.com/package/gulp-strip-comments)
[![decomment](https://img.shields.io/badge/decomment-v0.9.0-blue.svg?style=flat-square)](https://github.com/vitaly-t/decomment)
[![David](https://david-dm.org/rnbwd/gulp-strip-comments.svg?style=flat-square)](https://david-dm.org/rnbwd/gulp-strip-comments)

> [decomment](https://github.com/vitaly-t/decomment) - removes comments from JSON, JavaScript, CSS, HTML, etc.

[![NPM](https://nodei.co/npm/gulp-strip-comments.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-strip-comments/)


## Features

* Removes both single and multi-line comments from JSON, JavaScript and CSS/Text
* Automatically recognizes HTML and removes all `<!-- comments -->` from it
* Does not change layout / formatting of the original document
* Removes lines that have only comments on them
* Compatible with CSS3, JSON5 and ECMAScript 6

The library does not support mixed content - HTML with JavaScript or CSS in it.
Once the input code is recognized as HTML, only the HTML comments will be removed from it.

## Performance

For JSON and JavaScript this library uses [esprima] to guarantee correct processing for regular expressions.

As an example, it can process [AngularJS 1.5 Core](https://code.angularjs.org/1.5.0/angular.js)
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

```
let strip = require('gulp-strip-comments') // == decomment
```

### [strip(options)](https://github.com/vitaly-t/decomment#decommentcode-options--string)

This method first checks if the code starts with `<`, as an HTML, and if so, all `<!-- comment -->` entries
are removed, according to the `options`.

When the `code` is not recognized as HTML, it is assumed to be either JSON or JavaScript. It is then parsed
through [esprima] for ECMAScript 6 compliance, and to extract details about regular expressions.

If [esprima] fails to validate the code, it will throw a parsing error. When successful, this method will remove
`//` and `/**/` comments according to the `options` (see below).

##### options.safe ⇒ Boolean

* `false (default)` - remove all multi-line comments
* `true` - keep special multi-line comments that begin with:
 - `<!--[if` - for conditional comments in HTML
 - `/*!` - for everything else (other than HTML)

##### options.ignore ⇒ RegExp | [RegExp,...]

Takes either a single or an array of regular expressions to match against.
All matching blocks are then skipped, as well as any comment-like content inside them.

Examples:

* CSS may contain Base64-encoded strings with comment-like symbols:
```css
  src: url(data:font/woff;base64,d09GRg//ABAAAAAAZ)
```
You can isolate all `url(*)` blocks by using:
```js
  {ignore: /url\([\w\s:\/=\-\+;,]*\)/g}
```
* If you want to isolate jsDoc blocks (start with `/**`, followed by a line break, end with `*/`),
you can use the following:
```js
{ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g}
```

##### options.space ⇒ Boolean

* `false (default)` - remove comment blocks entirely
* `true` - replace comment blocks with white spaces where needed, in order to preserve the original line + column position of every code element.

NOTE: When this option is enabled, option `trim` is ignored.

##### options.trim ⇒ Boolean

* `false (default)` - do not trim comments
* `true` - remove empty lines that follow removed full-line comments

NOTE: This option has no effect when option `space` is enabled.

### [strip.text(options)](https://github.com/vitaly-t/decomment#decommenttexttext-options--string)

Unlike the default **strip** method, it instructs the library that `text` is not a JSON, JavaScript or HTML, rather a plain text that needs no parsing or validation, only to remove `//` and `/**/` comments from it according to the `options`.

This method is good for any text file that uses syntax `//` and `/**/` for comments, such as: `.CSS`, `.CPP`, `.H`, etc.

Please note that while the same rules apply for the text blocks (`''`, `""` and \`\`), you should not use this method for JSON or JavaScript, as it can break your regular expressions.

### [strip.html(options)](https://github.com/vitaly-t/decomment#decommenthtmlhtml-options--string)

Unlike the default **strip** method, it instructs the library not to parse
or validate the input in any way, rather assume it to be HTML, and remove all
`<!-- comment -->` entries from it according to the `options`.

### [strip.getEOL()](https://github.com/vitaly-t/decomment#decommentgeteoltext--string)

Returns End-of-Line string used within the `text`, based on the occurrence frequency:

* `\n` - for Unix-encoded text
* `\r\n` - for Windows-encoded text

When impossible to conclude (the same or 0 occurrence), it returns the default End-of-Line for the current OS.

-------


[![licence](https://img.shields.io/npm/l/gulp-strip-comments.svg?style=flat-square)](https://opensource.org/licenses/MIT)
