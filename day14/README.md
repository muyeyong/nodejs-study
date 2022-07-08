## nodejs 内存优化
  使用内存池，但是在开发中没有没有遇到过使用内存池(没有明显感知的场景)
  node的buffer就是使用内存池，大于 8kb 与小于 8k比较
  https://www.imyangyong.com/blog/2019/11/node/Node%20js%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%EF%BC%88%E4%BA%8C%EF%BC%89%EF%BC%9A%E5%86%85%E5%AD%98%E4%BC%98%E5%8C%96%E7%AE%A1%E7%90%86/

## 内存泄漏 内存溢出

内存溢出是指系统分配不了需要的内存
内存泄漏是指使用的内存没有被收回
