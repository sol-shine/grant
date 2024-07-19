
var Koa = require('koa')
var session = require('koa-session')
var Router = require('koa-router')
var grant = require('../../').koa()


var app = new Koa()
app.keys = ['grant']

app
  .use(session(app))
  .use(new Router()
    .all('/connect/:provider/:override?', async (ctx, next) => {
      await next()
      ctx.body = JSON.stringify(ctx.state.grant.response, null, 2)
    })
    .routes())
  .use(grant(require('./config.json')))
  .listen(3000)
