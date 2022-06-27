// 三种方式创建buffer
const bf1 = Buffer.from([1,2,3,4]) // 从什么中创建buffer
const bf2 = Buffer.alloc(5) // 创建一个指定长度的buffer
const buf3 = Buffer.allocUnsafe(10)

// 如果想要去修改buffer需要指定位置修改，比较麻烦

bf2.writeInt8(127, 0)
console.log(bf1, bf2)