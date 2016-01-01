
var strip = require('../');
var should = require('should');
var gutil = require('gulp-util');

describe('decomment', function(){
  var fakeFile;

  function getFakeFile(fileContent){
    return new gutil.File({
      path: './test/fixture/test.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer(fileContent || '')
    });
  }

  it('should decomment safely', function(done){
    var fakeFile = getFakeFile('/*! special */ js code /* normal */');

    var stream = strip();
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('/*! special */ js code ');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should decomment', function(done){
    var fakeFile = getFakeFile('/*! special */ js code /* normal */');

    var stream = strip({safe: false});
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal(' js code ');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should decomment text', function(done){
    var fakeFile = getFakeFile('cssClass{color:Red;}// comments');

    var stream = strip.text();
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('cssClass{color:Red;}');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

  it('should decomment html', function(done){
    var fakeFile = getFakeFile('<html><body><!-- comment --><div>test</div><!-- comment --></body></html>');

    var stream = strip.html();
    stream.on('data', function (newFile) {
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal('<html><body><div>test</div></body></html>');
    });
    stream.once('end', done);
    stream.write(fakeFile);
    stream.end();
  });

});
