// require('@babel/preset-react')(
//   {
//     presets: ['@babel/react']
//   }
// )
require("@babel/register")({
  presets: ['@babel/preset-react']
})
const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')
const getData = require('./getData')
const template = require('./template')(__dirname+'/index.html')
const ReactDomServe = require('react-dom/server')
const React = require('react')
const APP = require('./app.jsx')



// console.log('List', List)

console.log()



const app = new koa()


app.use(mount('/api', async ctx => {
  const { sort, order} = ctx.request.query
  const data = await getData({ sort, order})

 const reactStr =  ReactDomServe.renderToString(APP(data))
 
  ctx.body = template({renderString: reactStr})
  ctx.status = 200
}))


app.listen(4000)