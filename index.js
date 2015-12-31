/* jshint node: true */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var strip = require('decomment');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-strip-comments';

function gulpStripComments(options){

  var opts = options || {};
  var safety = (typeof opts.safe === 'boolean' && opts.safe === false);

var stream = through.obj(function(file, enc, cb){

  if (file.isNull()) {
    cb(null, file);
    return;
  }

  if (file.isStream()) {
    cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    return;
  }

    if (file.isBuffer()) {
      file.contents = new Buffer(strip(file.contents.toString(), {safe: safety ? false : true}));
    }

    this.push(file);

    return cb();
  });

  return stream;
}

module.exports = gulpStripComments;
