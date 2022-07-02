const net = require('net')
class Rpc {
  constructor({ decodeRequest, encodeResponse, isComplete}){
    this.decodeRequest = decodeRequest
    this.encodeResponse = encodeResponse
    this.isComplete = isComplete
  }
  createServer(callBack) {
    let oldBuffer = null
    const server = net.createServer(socket => {
        socket.on('data', buffer => {
          if (oldBuffer) {
            buffer = Buffer.concat([oldBuffer, buffer])
          }
          let requestLength = 0
          while(requestLength = this.isComplete(buffer)) {
            let requestBuffer = null
            if (requestLength === buffer.length) {
              requestBuffer = buffer
              oldBuffer = null
            } else {
              requestBuffer = buffer.slice(0 ,requestLength)
              oldBuffer = buffer.slice(requestLength)
            }
            const request = this.decodeRequest(requestBuffer)
            callBack({
              body: request.result,
              socket
            },
            {
              end: (data) => {
                const buffer = this.encodeResponse(data, request.seq)
                socket.write(buffer)
              }
            })
          }
        })
    })
    return {
      listen : function() {
        server.listen.apply(server, arguments)
      }
    }
  }
}

module.exports = Rpc