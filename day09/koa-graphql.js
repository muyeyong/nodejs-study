const koa = require('koa')
const graphqlHttp = require('koa-graphql')
const mount = require('koa-mount')
const schema = require('./schema')


const app = new koa()

const rootValue = { hello: () => 'hello word', name: () => '上帝说我刷的恒'}
const source = '{ name }'
app.use(mount('/query', graphqlHttp({
    schema,
    rootValue
  }))
)

// app.use(mount('/query', async ctx => {
//   const res = await graphqlHttp({schema, source, rootValue})
//   ctx.body = res
// }))

app.listen(4000)

// const app = new (require('koa'));
// const graphqlHTTP = require('koa-graphql');


// app.use(
//     graphqlHTTP({
//         schema: require('./schema')
//     })
// )

// app.listen(3000);