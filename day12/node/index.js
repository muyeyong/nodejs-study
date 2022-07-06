// require('@babel/preset-react')(
//   {
//     presets: ['@bable/react']
//   }
// )
const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')
const getData = require('./getData')


const app = new koa()


app.use(mount('/api', async ctx => {
  const { sort, order} = ctx.request.query
  const data = await getData({ sort, order})
  ctx.body = data
  ctx.status = 200
  console.log('data', data)
}))

app.listen(4000)