const express = require('express')
const fs = require('fs')
const { nextTick } = require('process')
const game = require('./game')

const app = express()

let userWon = 0
let userSomeInput = 0
let preInputAction = null

// 使用中间件 next


app.get('/game', function(req, res, next) {
  if (userWon >= 3) {
    res.status(200)
    res.send('你太厉害了，我不跟你完了')
    return
  }
  if (userSomeInput >= 3) {
    res.status(200)
    res.send('我怀疑你在作弊')
    return
  }
  next()
  if (res.userWin) {
    userWon++
  }
}, function(req, res) {
  const query = req.query
  const action = query.action
  const gameResult = game(action)
  res.status(200)
  if (gameResult === 0) {
    res.send('我们打成平手了')
  } else if (gameResult === 1) {
    res.send('你赢了')
    res.userWin = true
  }else if(gameResult === -1) {
    res.send('你输了')
  }
  if (preInputAction === action) {
    userSomeInput++
  } else {
    userSomeInput = 0
  }
  preInputAction = action

})

app.get('/', function(req, res) {
  res.status(200)
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})

app.listen(3000)

