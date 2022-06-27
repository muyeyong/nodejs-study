const Koa = require('koa')
const mount = require('koa-mount')
const fs = require('fs')
const game = require('../day03/game')

const app = new Koa()

const gameKoa = new Koa()

let preInputAction = null
let someInputCount = 0
let wonCount = 0

app.use(mount('/game', gameKoa))

// 判断能不能继续
gameKoa.use(async(ctx, next) => {
  if (someInputCount >= 3) {
    ctx.body = '我怀疑你在作弊'
    return
  }
  if (wonCount >= 3) {
    ctx.body = '不玩了 不玩了，你太厉害了'
    return
  }
  await next()
  if (ctx.playerWin) {
    wonCount++
  }
  if (ctx.request.query.action === preInputAction) {
    someInputCount++
  } else {
    someInputCount = 0
  }
  preInputAction = ctx.request.query.action
})

// 异步获取游戏结果
gameKoa.use(async(ctx) => {
  const action = ctx.request.query.action
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const gameResult = game(action)
      ctx.status = 200
      if (gameResult === 0) {
        ctx.body = '我们是平手'
      } else if (gameResult === -1) {
        ctx.body = '你输了'
      } else if (gameResult == 1) {
        ctx.body = '你赢了'
        ctx.playerWin = true
      } else {
        ctx.body = '我也不知道发生了啥'
      }
      resolve()
    }, 100 + 1000*Math.random())
  })
})

app.use(mount('/', function(ctx){
   ctx.body = fs.readFileSync(__dirname+ '/index.html', 'utf-8')
}))

app.listen(3000)
