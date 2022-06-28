/* 
全双工通信存在的问题
  时序问题： 请求顺序和返回顺序不一定一一对应 --> 使用包序号
  包不完整：太长了，可以分隔
 */
const prorobuffs = require('protocol-buffers')
const fs = require('fs')
const message = prorobuffs(fs.readFileSync(__dirname+ '/test.proto'))


const net = require('net')
const socket = new net.Socket({})
let requestCount = 5
let seq = 0

const getRandomid = () => {
  const ids = ['14513', '4562', '3561', '4567', '8905']
  return ids[Math.floor(Math.random() * ids.length)]
}

const encode = () => {
  const id = getRandomid()
  console.log('client seq:', seq)
  return message.Request.encode({ id, seq: seq++ })
}

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

setInterval(() => {
  socket.write(encode())
}, 500)

socket.on('data', (buffer) => {
  console.log('client', message.Response.decode(buffer)) 
  // const id = getRandomid()
  // console.log('client send:', id)
  // socket.write(message.Request.encode({ id }))
})