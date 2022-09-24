const net = require('net')

const menus = {
  '14513' : '酸菜鱼', 
  '4562': '大笨鹅', 
  '3561': '红烧鲤鱼', 
  '4567': '大盘鸡', 
  '8905': '花雕醉鸡'
}


const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    setTimeout(() => {
      console.log('server', buffer.toString(),  buffer.readInt16BE())
      const id = buffer.toString() // buffer.toString() 怎么样 -> 使用什么样的编码，就怎样解码
      socket.write(Buffer.from(menus[id]))
    }, 2000)
  })
})

server.listen(4000)


