# [gulp](http://gulpjs.com)-strip-comments [![Build Status](https://img.shields.io/travis/RnbWd/gulp-strip-comments.svg?style=flat-square)](https://travis-ci.org/RnbWd/gulp-strip-comments)

> [decomment](https://github.com/vitaly-t/decomment/) - Removes comments from JSON, JavaScript, CSS and HTML.

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

#### options.safe

Type: `boolean`
Default: `true`

This API differs from the original. Explicity set options.safe to *false* if you want to turn off this feature. See [decomment](https://github.com/vitaly-t/decomment).

##### options.trim ⇒ Boolean
* `false (default)` - do not trim comments
* `true` - remove empty lines that follow removed full-line comments

### strip.text([options]) ⇒ String

CSS is the most frequent example of where this method is to be used.

Please note that while comment blocks located inside `''`, `""` or \`\` are not removed,
the same as for JSON or JavaScript, you should not use this method for JSON or JavaScript,
as it can break your regular expressions.

### strip.html([options]) ⇒ String

It instructs the library not to parse or validate the input in any way, rather assume it to be HTML, and remove all `<!-- comment -->` entries from it according to the `options`.

## License

MIT © [RnbWd](https://github.com/RnbWd)
