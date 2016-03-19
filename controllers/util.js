'use strict';
const co = require('co');
const fs = require('co-fs');
const path = require('path');

module.exports.xresponsetime = function* (next) {
  let start = new Date;
  yield next;
  let delta = new Date - start;
  this.set('X-Response-Time', `${delta}ms`);
}

module.exports.uid = function() {
	return Math.random().toString(36).slice(2);
}

module.exports.read = function(tmpdir, file, fn) {
	co(function* () {
		var files = yield fs.readdir(tmpdir);

		for( var i = 0; i < files.length; i++) {
			console.log("yes")
		}
	});
} 
