const protocol = require('protocol-buffers')
const EasySock = require('easy_sock')
let schema = null
let easySock = null

module.exports = {
  compile: config => {
    schema = protocol(config.protocolFile)
    easySock = new EasySock({
      ip: config.ip,
      port: config.port,
      keepAlive : true,
		  timeout : 500
    })
    easySock.decode = (buffer) => {
      console.log(buffer)
      const seq = buffer.readInt32BE()
      const result = schema[config.responseStruct].decode(buffer.slice(8)) 
      return {
        result,
        seq
      }
    }
    easySock.encode = (data, seq) => {
      const head = Buffer.alloc(8)
      const body = schema[config.requestStruct].encode(data)
      head.writeInt32BE(seq)
      head.writeInt32BE(body.length, 4)
     
      return Buffer.concat([head, body])
    }
    easySock.isReceiveComplete = (buffer) => {
      if (buffer.length < 8) return 0
      const bodyLength = buffer.readInt32BE(4)
      return buffer.length >= bodyLength + 8 ? bodyLength + 8 : 0
    }
  },
  request: data => {
    // return easySock.write({sort: 1, order: 'id'})
    return new Promise((resolve, reject) => {
      easySock.write(data,(err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }
}