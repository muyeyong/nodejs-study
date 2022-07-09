const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200)
  res.end('我也不知道写点啥')
}).listen(4002, ()=>{
  console.log('http服务运行在4002端口')
})