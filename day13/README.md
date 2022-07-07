## 性能测试学习
### 压测：使用ab ？
  requests per second : 每秒能处理的请求次数
  time per request: 平均请求处理时间 (mean)
  time per request: 多久一个请求能够被处理 (mean, across all concurrent requests)
  transfer rate : 吞吐量，读写

### 使用Linux命令，找到性能瓶颈
  top: 计算机信息 cpu 内存
  iostat: 硬盘信息

### 查看测试结果
  1: 可以使用node自带的prof生成log ==> node --prof index.js,然后压测的结果会保存在一个log文件中
      使用node --prof-process xxxx.log > prof.txt, 就会将log文件存储到prof.txt中
  2: 使用chrome的inspect查看压测结果 ==> node --inspect-brk index.js, 会生成一个websock连接，
      打开chrome,地址栏输入 chrome://inspect就可以以图标的形式查看

## 问题
 mac自带的ab版本过低
![](https://s2.loli.net/2022/07/07/7UuqgdBHjWMEhlT.png)
解决ab版本低
![](https://s2.loli.net/2022/07/07/P6tQ2gY9pfbMRac.png)
![](https://s2.loli.net/2022/07/07/qaojb5yJKxZCnYf.png)
![](https://s2.loli.net/2022/07/07/Qk7ptREVdmIMDY4.png)

  居然没问题了，我搞了一天，不知道怎么搞的就好了，无语😒