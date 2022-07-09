const fs = require('fs')
module.exports = {
  List : {
    protocol: 'list-rpc',
    ip: '127.0.0.1',
    port: 4003,
    protocolFile: fs.readFileSync(__dirname+'/protocol/test.proto'),
    responseStruct: 'Response',
    requestStruct: 'Request',
    then: res => res && res.list
  },
  ExtendInfo: {
    protocol: 'http',
    url: 'http://127.0.0.1:4002',
    then: res => res
  }
}