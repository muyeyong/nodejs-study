const fs = require('fs')
const protobuf = require('protocol-buffers')

const schemas = protobuf(fs.readFileSync(__dirname+'/test.proto'))

const buffBook = schemas.Book.encode({
  price: 12.34,
  number: 34
})

console.log('buffBook', buffBook)
console.log(schemas.Book.decode(buffBook))