const mount = require("koa-mount");
const requestFactory = require("./server/request-factory");
const createTemplate = require("./create-template");
const vm = require("vm");

requestFactory.registerProtocol("list-rpc", require("./server/requestors/rpc"));
requestFactory.registerProtocol("http", require("./server/requestors/http"));

module.exports = function (app) {
  const koa = new (require("koa"))();

  koa.use(async (ctx, next) => {
    if (ctx.url == "/favicon.ico") {
      return;
    }
    await next();
  });

  Object.keys(app).forEach((routepath) => {
    let dataConfig = {};
    vm.runInContext(
      app[routepath].data,
      vm.createContext({ global: dataConfig })
    );
    if (!dataConfig) return;

    const requests = Object.keys(dataConfig).reduce((ret, key) => {
      ret[key] = requestFactory(dataConfig[key]);
      return ret;
    }, {});

    const template = createTemplate(app[routepath].template);
   

    koa.use(
      mount(routepath, async (ctx) => {
        ctx.status = 200;
        const result = {};
        await Promise.all(
          Object.keys(requests).map((key) => {
            return requests[key](ctx.query).then((res) => {
              result[key] = res.result;
              return res.result;
            });
          })
        );
        console.log('result', result)
        try {
          ctx.body = template({ data: [{ id: 1, title: '233', price: 234 }]});
        } catch (e) {
          ctx.status = 500;
          ctx.body = e.stack;
        }
      })
    );
  });

  koa.listen(3000);
};
