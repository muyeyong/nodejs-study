const requestFactory = require('./server/request-factory')

requestFactory.registprotocol('list-rpc', require('./server/requestors/rpc'))
requestFactory.registprotocol('http', require('./server/requestors/http'))

const protoConfig = require('./rpc-config')

const requestList = requestFactory(protoConfig.List)
const requestExtendInfo = requestFactory(protoConfig.ExtendInfo)
requestList({ sort: 'id', order: '0'}).then( res => console.log('requestList:', res))
requestExtendInfo().then(res => console.log('requestExtendInfo:', res))