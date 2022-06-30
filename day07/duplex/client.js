/* 
全双工通信存在的问题
  时序问题： 请求顺序和返回顺序不一定一一对应 --> 使用包序号
  包不完整(粘包、缺包)：太长了，可以分隔 --> 使用包头记录body的长度
 */
const prorobuffs = require('protocol-buffers')
const fs = require('fs')
const message = prorobuffs(fs.readFileSync(__dirname+ '/test.proto'))


const net = require('net')
const socket = new net.Socket({})
let seq = 0

const getRandomid = () => {
  const ids = ['14513', '4562', '3561', '4567', '8905']
  return ids[Math.floor(Math.random() * ids.length)]
}

const encode = () => {
  const id = getRandomid()
  console.log('client encode', seq, id)
  const requestBody = {
    id
  }
  const body = message.RequestBody.encode(requestBody)
  const header = Buffer.alloc(6)
  header.writeInt16BE(seq++)
  header.writeInt32BE(body.length, 2)
 return Buffer.concat([header, body])
}

const decode = (buffer) => {
  const header = buffer.slice(0, 6)
  const seq = header.readInt16BE()
  const { name } = message.ResponseBody.decode(buffer.slice(6))
  return { seq, name}
}

const checkComplete = (buffer) => {
  if (buffer.length < 6) {
    return 0
  }
  const bodyLength = buffer.readInt32BE(2)
  return 6 + bodyLength
}

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

// setInterval(() => {
//   socket.write(encode())
// }, 500)

for(let i = 0;i < 10; i++) {
  socket.write(encode())
}


socket.on('data', (buffer) => {
  let oldBuffer = null
  let packageLength = 0
  while(packageLength = checkComplete(buffer)) {
    const package = buffer.slice(0, packageLength)
    buffer = buffer.slice(packageLength)
    console.log('client', decode(package)) 
  }
  oldBuffer = buffer
  // const id = getRandomid()
  // console.log('client send:', id)
  // socket.write(message.Request.encode({ id }))
})