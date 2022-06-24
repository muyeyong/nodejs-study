// exports.a = '我是A' // 导出单个属性

exports.aFun = () => console.log('我是A') // 导出单个属性

/* exports = function() {
  console.log('导出一个类')
} 
输出： {}

*/

module.exports.a = 'module.exports.a'

module.exports = function() {
  console.log('function')
  name : 'a'
} // 覆盖之前的属性