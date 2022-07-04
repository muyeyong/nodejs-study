const graphqlHTTP = require('koa-graphql')
const koa = require('koa')
const mount = require('koa-mount')
const schema = require('./schema')
const fs = require('fs')

const app = new koa({})

let commentList = [
  { id: 1, title: '湖南黄金', praiseNum: 0}, 
  { id: 2, title: '三安光电', praiseNum: 1},
  { id: 3, title: '安徽建工', praiseNum: 0}
]

const rootValue = {
  comment: () => commentList,
  name: () => '上帝说我帅的很',
  praise: ({ id }) => {
    let result = 0
    commentList = commentList.map(item => {
      if (item.id === id) {
          item.praiseNum += 1
          result = item.praiseNum
      }
      return item
    })
    return result
  }
}

app.use(mount('/query', graphqlHTTP({
  schema,
  rootValue
})))

app.use(
  mount('/', async ctx => {
    ctx.status = 200
    ctx.body =  fs.readFileSync(__dirname+'/source/index.html', 'utf-8')
  })
)

app.listen(3000)