const net = require('net')

const prorobuffs = require('protocol-buffers')
const fs = require('fs')
const message = prorobuffs(fs.readFileSync(__dirname+ '/test.proto'))

const menus = {
  '14513' : '酸菜鱼', 
  '4562': '大笨鹅', 
  '3561': '红烧鲤鱼', 
  '4567': '大盘鸡', 
  '8905': '花雕醉鸡'
}

const encode = (id, seq) => {
  const responseBody = {
    name: menus[id]
  }

  const body = message.ResponseBody.encode(responseBody)

  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length, 2)
  return Buffer.concat([header, body])
}

const decode = (buffer) => {
  const header = buffer.slice(0, 6)
  const seq = header.readInt16BE()
  const { id } = message.RequestBody.decode(buffer.slice(6))
  return { seq, id}
}


const checkComplete = (buffer) => {
  if (buffer.length < 6) {
    return 0
  }
  const bodyLength = buffer.readInt32BE(2)
  return 6 + bodyLength
}
const server = net.createServer((socket) => {
  let oldBuffer = null
  socket.on('data', buffer => {
    if (oldBuffer) {
      buffer = Buffer.concat([oldBuffer, buffer])
    }
    let packageLength = 0
    while(packageLength = checkComplete(buffer)) {
      const package = buffer.slice(0, packageLength)
      buffer = buffer.slice(packageLength)
      const result = decode(package)
      socket.write(encode(result.id, result.seq))
    }
    oldBuffer = buffer
  })
})

server.listen(4000)