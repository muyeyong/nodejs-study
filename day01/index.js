/* 
nodejs 没有requestAnimationFrame（下一帧执行）, 代替的是setImmediate
石头剪刀布游戏
  持续监听输入
  退出
 */
// console.log(__filename) // 当前文件路径
// console.log(__dirname) // 文件夹路径
// console.log(setImmediate)
// console.log(process.argv) // 获取命令行参数
const game = require('./game01.js')
process.stdin.on('data', buffer => {
  const userInput = buffer.toString().trim()
  game(userInput)
})