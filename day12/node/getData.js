const sock = require('./easySock')

module.exports = function({sort = 'id', order = 0}) {
  return new Promise((resolve, reject) => {
    sock.write({
      sort,
      order
    }, function (err, data) {
      err ? reject(err) : resolve(data)
    })
  })
}