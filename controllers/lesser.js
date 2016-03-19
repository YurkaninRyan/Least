'use strict';
const os = require('os');
const path = require('path');
const util = require('./util');
const views = require('co-views');
const parse = require('co-busboy');
const fs = require('co-fs');
const co = require('co');
const less = require('less');
const saveTo = require('save-to');

const render = views(__dirname + '/../views', {
  map: {
    html: 'swig'
  }
});


module.exports.home = function* home(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield render('index');
};

module.exports.process = function* process(next) {
    if('POST' != this.method) return yield next;
    if (!this.request.is('multipart/*')) return yield next;

    let parts = parse(this, { autoFields: true });
    let tmpdir = path.join(os.tmpdir(), util.uid())
    
    yield fs.mkdir(tmpdir);

    let files = [];
    let css = [];
    let to_compile = [];
    let less_filter = /\.less/g;   
    let file, part;

    while(part = yield parts) {
      if(part.fieldname === 'process') { 
        files.push(file = path.join(tmpdir, part.filename));
        to_compile.push(part.filename); 
      }

      else { files.push(file = path.join(tmpdir, part.filename)); }

      saveTo(part, file, (err, destination) => {
        if(err) throw err;
      });
    }

    to_compile.forEach( file => {
      util.read(tmpdir, file, err => {
        if(err) throw err;
      })
    });
    
    this.body = files;
    yield next;
}
