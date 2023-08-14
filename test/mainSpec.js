"use strict";

var PluginError = require("plugin-error");
var strip = require("../");
var stream = require("stream");
var Vinyl = require("vinyl");

////////////////////////
// Positive tests;
describe("Positive:", function () {
  it("should strip", function (done) {
    var fakeFile = getBuffer("/*! special */ js code /* normal */");
    var stream = strip();
    stream.once("data", function (newFile) {
      var data = newFile.contents;
      expect(data).toBeTruthy();
      expect(data.toString()).toBe(" js code ");
    });
    stream.once("end", done);
    stream.write(fakeFile);
    stream.end();
  });

  it("should strip safely", function (done) {
    var fakeFile = getBuffer("/*! special */ js code /* normal */");
    var stream = strip({ safe: true });
    stream.once("data", function (newFile) {
      var data = newFile.contents;
      expect(data).toBeTruthy();
      expect(data.toString()).toBe("/*! special */ js code ");
    });
    stream.once("end", done);
    stream.write(fakeFile);
    stream.end();
  });

  it("should strip text", function (done) {
    var fakeFile = getBuffer("cssClass{color:Red;}// comments");
    var stream = strip.text();
    stream.once("data", function (newFile) {
      var data = newFile.contents;
      expect(data).toBeTruthy();
      expect(data.toString()).toBe("cssClass{color:Red;}");
    });
    stream.once("end", done);
    stream.write(fakeFile);
    stream.end();
  });

  it("should strip html", function (done) {
    var fakeFile = getBuffer(
      "<html><body><!-- comment --><div>test</div><!-- comment --></body></html>",
    );
    var stream = strip.html();
    stream.once("data", function (newFile) {
      var data = newFile.contents;
      expect(data).toBeTruthy();
      expect(data.toString()).toBe("<html><body><div>test</div></body></html>");
    });
    stream.once("end", done);
    stream.write(fakeFile);
    stream.end();
  });
});

////////////////////////
// Negative tests;
describe("Negative:", function () {
  describe("with null buffer", function () {
    it("must return null data", function (done) {
      var fakeFile = getNull();
      var stream = strip();
      stream.once("data", function (newFile) {
        expect(newFile.contents).toBeNull();
      });
      stream.once("end", done);
      stream.write(fakeFile);
      stream.end();
    });
  });

  describe("with a stream", function () {
    var err;
    it("must throw an error", function (done) {
      try {
        var fakeFile = getStream();
        var stream = strip();
        stream.write(fakeFile); // this will throw an error;
      } catch (e) {
        err = e;
        done();
      }
      expect(err instanceof PluginError);
      expect(err.message).toBe("Streaming not supported.");
    });
  });

  describe("with a bad data", function () {
    var err;
    it("must throw an error", function (done) {
      try {
        var fakeFile = getBuffer("/*! special */ js code /* normal */");
        var stream = strip("help");
        stream.write(fakeFile);
      } catch (e) {
        err = e;
        done();
      }
      expect(err instanceof PluginError);
      expect(err.message).toBe("Parameter 'options' must be an object.");
    });
  });
});

function getFakeDest(content) {
  return new Vinyl({
    path: "./test/fixture/test.js",
    cwd: "./test/",
    base: "./test/fixture/",
    contents: content,
  });
}

function getBuffer(bufferContent) {
  return getFakeDest(Buffer.from(bufferContent));
}

function getNull() {
  return getFakeDest(null);
}

function getStream() {
  return getFakeDest(stream.PassThrough());
}
