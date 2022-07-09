/* 
  通过传入一个配置，来创建request
  简化建立rpc通信的步骤
    encode
    decode
  config包含：
    protocol: 协议名
    protocolFile:  protocol 文件地址
    requestStruct: 请求结构
    responseStruct: 响应结构
    compire: 编译函数，可以提前处理
    request: 请求，传入数据
    before: 数据提前处理钩子函数
    then: 请求完钩子函数
    catch: 请求发送错误钩子函数
 */
const requestors = {}

function factory(config) {
  config.before = config.before || (res => res)
  config.then = config.then || (res => res)
  config.catch = config.catch || (res => res)
  requestors[config.protocol].compile(config)
  return function(data) {
    data = config.before(data)
    return requestors[config.protocol].request(data).then(
        config.then()
      ).catch(
        config.catch()
      )
    }
}


/* 
 处理不同的请求包，请求包的包头和内容格式不尽相同

 requestor包含: 
  compoile: 提前编译
  request: 处理请求
 */
factory.registprotocol = (protocol, requestor) => {
  requestors[protocol] = requestor
}

module.exports = factory