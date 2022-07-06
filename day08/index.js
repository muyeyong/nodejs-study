/* 
  实现一个render函数渲染模板
  nodejs vm模块
 */

const vm = require('vm')
const fs = require('fs')

// 基本使用
// const res =  vm.runInNewContext('`我是${name}`', { name: 123 })
// console.log(res) // 我是123

// 实现xss过滤, helper 也是通过函数实现的
// const res2 = vm.runInNewContext('`我是${_(name)}`', { 
//   name: '<srcipt />',
//   _: function(markup) {
//     if (!markup) return ''
//     return String(markup)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/'/g, '&#39;')
//     .replace(/"/g, '&quot;')
//   }
// })

// console.log(res2)

// include

const templateMap = {
  a: '`我是A，我在引用${include("b")}`',
  b: '`我是B，我在引用${include("c")}`',
  c: '`我是C`'
}

const templateCache = {}

const context = vm.createContext({
  include: function(name) {
    const template = templateCache[name] || createTemplate(name)
    return template()
  }
}) 

function createTemplate(templatePath) {

  templateCache[templatePath] = vm.runInContext(
      `(function () {
          return ${templateMap[templatePath]}
      })`,
      context
  );

  return templateCache[templatePath]
}

// Object.keys(templateMap).forEach(key => {
//   const temp = templateMap[key]
//   templateMap[key] = vm.runInNewContext(`(function() { return ${temp}})`, context)
// })

// const res3 = vm.runInNewContext(templateMap['a'], { 
//   include: function(name) {
//     return templateMap[name]
//   }
// })

// console.log(res3)
// console.log(templateMap['a']())
console.log(createTemplate('a')())

// templateMap['a']()

// templateMap[a]() // ==> 输出结果

// const aString = "`我是解耦, ${data}`"

const aTest = vm.runInContext(
  `(function (data) {
    with (data) {
        return \`${fs.readFileSync(__dirname+'/b.html')}\`
    }
})`, vm.createContext({}))

console.log(aTest({ name: '123'}))
// vm.runInContext("`123${key}`", vm.createContext({ key: 456}))