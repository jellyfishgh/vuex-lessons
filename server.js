var koa = require('koa')
var app = koa()

// x-response-time

app.use(function* (next) {
  var start = new Date()
  yield next
  var ms = new Date() - start
  this.set('X-Response-Time', ms + 'ms')
})

// logger

app.use(function* (next) {
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(require('koa-static')('.', {
  index: 'static/index.html'
}))

app.listen(3000)
