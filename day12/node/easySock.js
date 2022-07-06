const EasySock = require('easy_sock')
const fs = require('fs')
const protobuff = require('protocol-buffers')


const schema = protobuff(fs.readFileSync(__dirname+'/test.proto'))



const easySock = new EasySock({
  ip: '127.0.0.1',
  port: 4003,
  keepAlive : true,
  timeout : 500
})

easySock.encode = (data, seq) => {
  const body = schema.Request.encode(data)
  const heade = Buffer.alloc(8)
  heade.writeInt32BE(seq) 
  heade.writeInt32BE(body.length, 4)
  return Buffer.concat([heade, body])
}

easySock.decode = (buffer) => {
  return {
    seq: buffer.readInt32BE(),
    result: schema.Response.decode(buffer.slice(8))
  }
}

easySock.isReceiveComplete = (buffer) => {
  if (buffer.length < 8) return 0
  const bodyLength = buffer.readInt32BE(4)
  return buffer.length >= bodyLength + 8 ? bodyLength + 8 : 0
}

module.exports = easySock