const koa = require('koa')
const app = new koa()

app.use(async ctx => {
  ctx.body = 'list page'
})


module.exports = app