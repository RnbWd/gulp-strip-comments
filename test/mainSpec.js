'use strict';

var strip = require('../');
var util = require('gulp-util');
var stream = require('stream');

////////////////////////
// Positive tests;
describe("Positive:", function () {
    it('should strip', function (done) {
        var fakeFile = getBuffer('/*! special */ js code /* normal */');
        var stream = strip();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe(" js code ");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should strip safely', function (done) {
        var fakeFile = getBuffer('/*! special */ js code /* normal */');
        var stream = strip({safe: true});
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("/*! special */ js code ");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should strip text', function (done) {
        var fakeFile = getBuffer('cssClass{color:Red;}// comments');
        var stream = strip.text();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("cssClass{color:Red;}");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should strip html', function (done) {
        var fakeFile = getBuffer('\<html><body><!-- comment --><div>test</div><!-- comment --></body></html>');
        var stream = strip.html();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("\<html><body><div>test</div></body></html>");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

});

////////////////////////
// Negative tests;
describe("Negative:", function () {
    describe("with null buffer", function () {
        it('must return null data', function (done) {
            var fakeFile = getNull();
            var stream = strip();
            stream.once('data', function (newFile) {
                expect(newFile.contents).toBeNull();
            });
            stream.once('end', done);
            stream.write(fakeFile);
            stream.end();
        });
    });

    describe("with a stream", function () {
        var err;
        it('must throw an error', function (done) {
            try {
                var fakeFile = getStream();
                var stream = strip();
                stream.write(fakeFile); // this will throw an error;
            } catch (e) {
                err = e;
                done();
            }
            expect(err instanceof util.PluginError);
            expect(err.message).toBe("Streaming not supported.");
        });
    });
});

function getFakeDest(content) {
    return new util.File({
        path: './test/fixture/test.js',
        cwd: './test/',
        base: './test/fixture/',
        contents: content
    });
}

function getBuffer(bufferContent) {
    return getFakeDest(new Buffer(bufferContent));
}

function getNull() {
    return getFakeDest(null);
}

function getStream() {
    return getFakeDest(stream.PassThrough());
}
