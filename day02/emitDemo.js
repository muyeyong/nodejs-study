const EventEmitter = require('events').EventEmitter

class News extends EventEmitter {
  constructor() {
    super()
    setInterval(() => {
      this.emit('news', {
        news: `请查看${Date.now()}新闻`
      })
    }, 2000)
  }
}

module.exports = new News()