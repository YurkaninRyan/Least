'use strict';

module.exports.xresponsetime = function* (next) {
  let start = new Date;
  yield next;
  let delta = new Date - start;
  this.set('X-Response-Time', `${delta}ms`);
}
