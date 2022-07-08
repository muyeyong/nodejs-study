const test = require('./build/Release/test.node')
// const test = require('bindings')('test') 会报错

console.log(test.hello())