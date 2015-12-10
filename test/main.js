/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

var strip = require('../');
var should = require('should');
var gutil = require('gulp-util');

describe('strip-comments', function(){
  var fakeFile;

  function getFakeFile(fileContent){
    return new gutil.File({
      path: './test/fixture/test.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer(fileContent || '')
    });
  }

  it('should remove all comments', function(done){
    var fakeFile = getFakeFile('/* A banner  */ Hello world // protected');

    var stream = strip();
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal(' Hello world ');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should only remove unsafe block comments', function(done){
    var fakeFile = getFakeFile('/!* A banner */ Hello world /* unprotected */ // protected');

    var stream = strip({block: true});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('/!* A banner */ Hello world  // protected');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should only remove inline comments', function(done){
    var fakeFile = getFakeFile('/* A banner */ Hello world // unprotected');

    var stream = strip({line: true});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('/* A banner */ Hello world ');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should not remove safe inline comments', function(done){
    var fakeFile = getFakeFile('/* A banner */ Hello world //! protected');

    var stream = strip({line: true});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('/* A banner */ Hello world //! protected');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should remove all inline comments', function(done){
    var fakeFile = getFakeFile('/* A banner */ Hello world //! unprotected');

    var stream = strip({line: true, safe: false});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('/* A banner */ Hello world ');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should throw error', function(done){
    var fakeFile = getFakeFile('/* A banner */ Hello world //! unprotected');

    var stream = strip({line: true, block: true});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
    });

    stream.on('error', function(err) {
      should.exist(err);
      err.message.should.equal('Please choose either block or line, not both!');
    });

    stream.once('end', done);
    stream.end();
  });

});



