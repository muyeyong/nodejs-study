const koa =  require('koa')
const mount = require('koa-mount')
const app = new koa()
const routers = require('./routers')


// app.use(mount('/detail', require('./detail')))

// app.use(mount('/list', require('./list')))
// 读取配置，渲染路由
Object.keys(routers).forEach( routerKey => {
  app.use(mount(routerKey, async ctx => {
    ctx.body = await routers[routerKey]()
  }))
})

app.listen(4000, () => {
  console.log('4000端口监听')
})
