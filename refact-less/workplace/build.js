const upload = require('./upload')

upload(__dirname+'/../business/list',  __dirname+'/src/list/data.js', __dirname+'/src/list/template.tpl')