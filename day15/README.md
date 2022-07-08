## 使用c++ 优化node的性能

node-gyp 生成.node文件(平台强关联 linux、window, 还更node版本关联)
node header 文件版本是什么？
 ===> N-API v8的接口变化很大，推荐使用N-API，通过一套api兼容不同版本的v8

 需要先编译才能使用: node-gyp rebuild ==> 生成.node文件

 ## 更好的使用
 在node中使用编译好的.node的文件时，路径引用比较麻烦，例如： const test = require('./build/Release/test.node')
 可以使用 bindings解决这个问题, 但是他是在项目的根目录去找
 const test = require('bindings')('test')


使用c++插件优化的时候，需要注意c++ 变量和 javascript变量的转换需要成本