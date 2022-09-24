## 使用React实现前后端同构

将React代码转换成字符串, 通过ReactDom.renderToString(<A />)
怎么将function 组件转换成 string，上面那个方法只能转换class组件
  如果要将function 组件使用 renderToString可以这样写 ===> renderToString(React.creteElement(App))

## 注意的地方
  前后端同构注重职责分离
    是按照环境划分 还是 按照数据划分（不是特别能理解）