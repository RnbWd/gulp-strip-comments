/* jshint node: true */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var strip = require('decomment');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-strip-comments';

function main(options, func) {

    var opts = options || {};
    opts.safe = (typeof opts.safe === 'undefined') ? true : false;
    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(func(file.contents.toString(), opts));
        }

        this.push(file);

        return cb();
    });

    return stream;
}

function gulpStripComments(options) {
    return main(options, strip);
}

gulpStripComments.text = function (options) {
    return main(options, strip.text);
};

gulpStripComments.html = function (options) {
    return main(options, strip.html);
};

module.exports = gulpStripComments;
