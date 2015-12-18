/* jshint node: true */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var stripComments = require('strip-comments');
var PluginError = gutil.PluginError;
var strip;

var PLUGIN_NAME = 'gulp-strip-comments';

function gulpStripComments(options){

  var noopt = typeof options === 'undefined';
  var opts = options || {};
  var block = (typeof opts.block === 'boolean' && opts.block === true);
  var line = (typeof opts.line === 'boolean' && opts.line === true);
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

  if (noopt || (!block && !line)) {
    strip = stripComments;
  } else if (block && line) {
    this.emit('error', new PluginError(PLUGIN_NAME, 'Please choose either block or line, not both!'));
  } else if (block) {
    strip = stripComments.block;
  } else if (line) {
    strip = stripComments.line;
  } else {
    this.emit('error', new PluginError(PLUGIN_NAME, 'Please define options correctly'));
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
