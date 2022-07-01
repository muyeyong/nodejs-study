## 使用GraphQL

将koa 和 koa-graphQL结合起来用需要注意的：
  koa-graphQL的版本 使用最新的 0.12.0 会报错，使用的是0.9.0
  成功启动的话要进行查询 `http://localhost:4000/query?query={hello}` 需要带上query和查询的字段
  只需要指定schema 和 rootValue就可以了，source是根据你发出的请求来的
  app.use(mount('/query', graphqlHttp({
    schema,
    rootValue
  }))
)