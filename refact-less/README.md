## 优化以前的代码 less化

三个页面: 根据不同的路径分发到不同的中间件

2022-07-09
  实现了将rpc通信简化，通过配置文件就可以实现不同源获取数据

2022-07-10
  实现类似云函数，上传本地配置文件，服务器去拉取使用
  上传数据文件 和 模版
2022-07-13
  运行webpack结果为undefine，基本确认是webpack打包的问题
  __webpack_exports__ 没有导出，想一想为什么
2022-07-14
  找到解决办法了，webapck配置问题 global 为 null
  https://segmentfault.com/q/1010000012933464

  上面的还是不行，但是我还解决了
  let dataConfig = {}
  vm.runInContext(app[routepath].data, vm.createContext({ global: dataConfig }))
  console.log(dataConfig1)
  将global指定为一个变量，就可以通过这个变量获取需要值了

## 怎样下沉 怎样less 怎样设计一个组件 ？
  1: 现将具体实现的功能点全部列举出来
  2: 分析那些东西是不变的，那些是变化的
  3: 对于变化的设计一个流程将其统一（分析需求流程）

  rpc通信： 
    rpc通信需要协议、端口、编码解码、其他，这些东西是变化的
    分析rpc流程 easysock为例：
        1：使用前： 需要创建一个easysock实例，并且对decode encode isComplete进行设置
        2：使用中： 调用rpc easysock.write
      所以可以将流程分为两个部分：
        compile: 通过配置创建实例
        request: 真正请求
      可以将这些变化的东西做成可配置的文件

  DAM的筛选：
    下拉筛选框，下拉内容不一致，下拉框的主体功能一致（显示筛选结果、清空筛选操作）
    下拉内容是可变的，下拉主体是固定的
    分析：
      下拉组件作为插槽插入，只做渲染
      下拉主体包含下拉内容，只做渲染

  什么时候展开 什么时候关闭



