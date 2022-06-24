const news = require('./emitDemo')

const listenerOne = () => {
  console.log('我是间谍One')
}

const listenerTow = () => {
  console.log('我是间谍Tow')
}

news.addListener('news', listenerOne)
// news.on('news', (res) => {
//   console.log(res)
// }) // 自己触发 自己监听

news.removeListener('news', listenerOne)


// connection