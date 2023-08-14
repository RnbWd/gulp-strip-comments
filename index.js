"use strict";

var through = require("through2");
var decomment = require("decomment");
var PluginError = require("plugin-error");

function main(options, func) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    if (file.isStream()) {
      cb(new PluginError("gulp-strip-comments", "Streaming not supported."));
    }
    try {
      file.contents = Buffer.from(func(file.contents.toString(), options));
      this.push(file);
    } catch (error) {
      this.emit(
        "error",
        new PluginError("gulp-strip-comments", error, {
          fileName: file.path,
        }),
      );
    }
    return cb();
  });
}

function gulpDecomment(options) {
  return main(options, decomment);
}

gulpDecomment.text = function (options) {
  return main(options, decomment.text);
};

gulpDecomment.html = function (options) {
  return main(options, decomment.html);
};

module.exports = gulpDecomment;
