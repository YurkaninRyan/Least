var compress = require('koa-compress');
var logger = require('koa-logger');
const lesser = require('./controllers/lesser');
const util = require('./controllers/util');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const app = module.exports = koa();

// Logging
app.use(logger());

// X-Response-Time
app.use(util.xresponsetime);

// Routes
app.use(route.get('/', lesser.home));
app.use(route.post('/process', lesser.process));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
