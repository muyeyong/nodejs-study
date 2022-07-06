## 实现前后端同构
### 前端

### node
  跟后端通信，获取数据
  负责前端发过来的请求
  将数据绑定到页面
### 后端
  负责数据的读取

### 问题
#### 模板引擎使用
 在使用模板引擎的时候
 vm.runInContext(
  `(function (data) {
    with (data) {
        return ${data}
    }
})`, vm.createContext({})
 会提示data没有定义，在runInContext第一个参数不能传递没有定义的值(这个值必须能够在当前上下文可以访问，不能是以后传入的值)


#### 引入jsx文件路径问题
  如果运行文件入口跟引用组件的位置跨目录，就会报错，如果将他们放到node目录下就没问题
  -- parent
    -- component
      - a // 引用的组件
    -- node
      -- index.js // 运行文件

  为什么有这样的问题？？？？暂时没搞清楚

