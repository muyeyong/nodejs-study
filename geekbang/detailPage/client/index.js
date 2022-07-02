// const mount = require('koa-mount');
// const static = require('koa-static')
const app = new (require('koa'));
const rpcClient = require('./server');


// app.use(mount('/static', static(`${__dirname}/source/static/`)))

app.use(async (ctx) => {
    if (!ctx.query.id) {
        ctx.status = 400;
        ctx.body = 'invalid id';
        return 
    }


    const result = await new Promise((resolve, reject) => {

        rpcClient.write({
            id: ctx.query.id
        }, function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })

    ctx.status = 200;
    
    ctx.body = result;
})

app.listen(3000)

// module.exports = app;