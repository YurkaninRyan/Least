'use strict';
var views = require('co-views');
var parse = require('co-body');
var co = require('co');

var render = views(__dirname + '/../views', {
  map: {
    html: 'swig'
  }
});


module.exports.home = function* home(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield render('index');
};

module.exports.process = function* process(next) {
    console.log(this.request);
    if('POST' != this.method) return yield next;
    var body = yield parse(this, { limit: '250mb' });
    if (!body.name) this.throw(400, 'Name field is required.');
    this.body = { name: body.name.toUpperCase() };
    this.response.status = 200;
}
