/* 
  基础版石头 剪刀 布
 */

module.exports = function(userInput) {
const legalInput = ['rock', 'paper', 'scissors']
// const userInput = process.argv.pop().trim()
 if (legalInput.includes(userInput)) {
    const robotInput =legalInput[(Math.ceil(Math.random() * 3) % 3)]
    if (userInput === robotInput) {
      console.log(`我出了${robotInput}, 我们是平手`)
    }else if(
      (userInput === 'rock' && robotInput === 'scissors') ||
      (userInput === 'scissors' && robotInput === 'paper') ||
      (userInput === 'paper' && robotInput === 'rock')
    ) {
      console.log(`我出了${robotInput}, 你赢了`)
    } else {
      console.log(`我出了${robotInput}, 你输了`)
    }
 } else {
   console.log(`只能输入${legalInput.join('、')}`)
 }
}


