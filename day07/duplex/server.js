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
  const responseHeader = {
    seq,
    bodyLength: message.ResponseBody.encode(responseBody).length
  }

  return message.Response.encode({
    header: responseHeader,
    body: responseBody
  })
 
}

const server = net.createServer((socket) => {
  socket.on('data', buffer => {
    // console.log('server:', buffer,  message.Request.decode(buffer))
    console.log(message.Request.decode(buffer))
    const { header: { seq, bodyLength}, body: { id } } = message.Request.decode(buffer)
    setTimeout(() => {
      socket.write(encode(id, seq))
    }, 100 + (Math.random() * 1000))
  })
})

server.listen(4000)