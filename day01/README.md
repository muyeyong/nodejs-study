# CommonJS exports 和 module.exports 区别，为什么要存在两个这个
  exports 是 module.exports 的引用
   module.exports会覆盖exports
   exports用来导出属性，module.exports可以导出一个构造器

# process.stdin.on() 发布订阅模式