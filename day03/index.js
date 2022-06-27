const http = require('http')
const fs = require('fs')
const url =  require('url')
const querystring = require('querystring')
const game = require('./game')
http.createServer((request, response) => {
  const parseUrl = url.parse(request.url)
  console.log(parseUrl.pathname)
  if (parseUrl.pathname === '/game') {
    const parseQuery = querystring.parse(parseUrl.query)
    const useInput = parseQuery.action
    const gameResult = game(useInput)
    console.log('gameResult', gameResult)
    if (gameResult === 0) {
      response.end('我们是平手')
    } else if (gameResult === 1) {
      response.end('你赢了')
    } else if (gameResult === -1) {
      response.end('你输了')
    } else {
      response.end('我不知道怎么回答')
    }
  }
  if (parseUrl.pathname === '/') {
    fs.createReadStream(__dirname+'/index.html').pipe(response)
  }
}).listen(3000)