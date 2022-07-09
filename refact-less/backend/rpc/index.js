const Rpc = require('./rpc')
module.exports =  function (requestSchema, responseSchema) {
  return new Rpc({
    encodeResponse: (data, seq) => {
      const body = responseSchema.encode(data)
      const header = Buffer.alloc(8)
      header.writeInt32BE(seq)
      header.writeInt32BE(body.length, 4)
      return Buffer.concat([header, body])
    },
    decodeRequest: (buffer) => {
     const seq = buffer.readInt32BE()
     return { seq,  result: requestSchema.decode(buffer.slice(8)) }
    },
    isComplete: (buffer) => {
       if (!buffer || buffer.length < 8) {
         return 0
       }
       return 8 + buffer.readInt32BE(4)
    }
  })
}