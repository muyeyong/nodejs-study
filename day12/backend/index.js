const fs = require('fs')
const graphqlHTTP = require('koa-graphql')
const protobuff = require('protocol-buffers')
const data = require('./data')
const schema = protobuff(fs.readFileSync(__dirname+'/test.proto'))
const server = require('./rpc')(schema.Request, schema.Response)


server.createServer((request, response) => {
  const { order = 0, sort = 'id'} = request.body
  // order >= 0 升序  < 0 降序
  const result = data.sort((a, b) => {
   return order >= 0 ? a[sort] - b[sort] : b[sort] - a[sort]
  })
  response.end({
    list: result
  })

}).listen(4003, () => {
  console.log('4003端口运行')
})