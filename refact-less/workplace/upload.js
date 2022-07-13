// 比如我要上传 list/ 下面的数据配置 和 模板配置，就会在对应的云端(其他目录)生成list/ 
const mkdirp = require('mkdirp')
const fs = require('fs')
const webpack = require('webpack')
const mfs = new (require('memory-fs'))
module.exports = function(businessName, dataJSPath, templatePath) {
  // businessName 创建一个business的文件夹
  const path = mkdirp.sync(__dirname+ '/../business/' + businessName)
  // console.log(path+'/'+templatePath.split('/').pop(), templatePath, dataJSPath)
  //dataJSPath 、templatePath 全部要以文本形式
  fs.createReadStream(templatePath).pipe(fs.createWriteStream(path+'/'+templatePath.split('/').pop()))

  // 使用webpack打包.proto 文件，遇到对应的包怎么用了？
  const compileTask = webpack({
    mode: 'development',
    devtool: false,
    target: 'node',
    entry: dataJSPath,
    module:{
      rules: [
        {
          test: /\.proto$/,
          use: 'text-loader' 
        }
      ]
    },
    output: {
      path: '/whatever',
      filename: 'data.js'
    }
  })

  compileTask.outputFileSystem = mfs
  compileTask.run(function(err) {
    if (err) { return }
    const content = mfs.readFileSync('/whatever/data.js')
    fs.writeFileSync(__dirname + '/../business/' + businessName + '/data.js', content);
})
  // compileTask.run(err => {
  //   if (!err) {
  //     const content = mfs.readFileSync('/whatever/data.js')
  //     // fs.createWriteStream(path+'/'+ dataJSPath.split('/').pop()).write(content)
  //     fs.writeFileSync(path+'/'+ dataJSPath.split('/').pop(), content)
  //   }
  // })

}