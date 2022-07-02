const protobuff = require('protocol-buffers')
const fs = require('fs')
const server = require('./rpc')
const data = require('./data')
const schemas = protobuff(fs.readFileSync(__dirname+'/test.proto'))


server(schemas.Request, schemas.Response).createServer(( request, response) => {
  const id = request.body.id

  response.end({ people: data.find(item => item.id === id)})
}).listen(4000, () => {
  console.log('服务器运行在4000端口')
})
