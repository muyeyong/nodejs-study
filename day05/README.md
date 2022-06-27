## 使用KOA实现划拳游戏
koa可以使用next异步，通过async await
自身没有路由
一个实例 app.use()只能使用一个中间件，如果要使用多个中间件需要多次使用use
创建koa实例需要使用new Koa(), express只需要 express()
跟express不同，koa将response request 挂载到ctx上