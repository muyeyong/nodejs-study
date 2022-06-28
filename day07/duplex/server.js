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

const server = net.createServer((socket) => {
  socket.on('data', buffer => {
    // console.log('server:', buffer,  message.Request.decode(buffer))
    const { id, seq } = message.Request.decode(buffer)
    setTimeout(() => {
      socket.write(message.Response.encode({
        id,
        seq,
        name: menus[id]
      }))
    }, 100 + (Math.random() * 1000))
    // socket.write(message.Response.encode({
    //   id,
    //   name: menus[id]
    // }))
  })
})

server.listen(4000)