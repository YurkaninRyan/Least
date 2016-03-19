var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
const lesser = require('./controllers/lesser');
const util = require('./controllers/util');
const route = require('koa-route');
const koa = require('koa');
const koa_static = require('koa-static')("/tmp", {});
const multer = require('koa-multer');
const upload = multer({ dest: './uploads/'});
const path = require('path');
const app = module.exports = koa();

// Logging
app.use(logger());

// Static
app.use(require('koa-static')("/tmp", {}));

// X-Response-Time
app.use(util.xresponsetime);

app.use(route.get('/', lesser.home));
app.use(route.post('/process', upload.single('file')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
