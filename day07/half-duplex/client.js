// 实现一个半双工
const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

const getRandomid = () => {
  const ids = ['14513', '4562', '3561', '4567', '8905']
  return ids[Math.floor(Math.random() * ids.length)]
}

const encode = () => {
  // const buffer = Buffer.alloc(4)
  // buffer.writeInt16BE(getRandomid())
  return Buffer.from(getRandomid())
}


socket.write(encode())

socket.on('data', (buffer) => {
  console.log(buffer.toString())
  socket.write(encode())
})