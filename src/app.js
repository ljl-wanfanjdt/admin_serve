const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// 导入路由
const router = require('./router/index')

// 导入同一错误处理
const errorHandler = require('./conf/error-handle')

// 引入log4js
const log = require('./conf/log4js.config')
// 创建app
const app = new Koa()

// 捕获异常方式一
// app.use(async (ctx, next) => {
//   console.log(1111111111111111)
//   try {
//     await next()
//   } catch (error) {
//     console.log(error.message)
//   }
// })



app.use(bodyParser())

app.use(async (ctx, next) => {
  // log.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log.info(`method:${ctx.request.method} url:${ctx.request.url} params:${JSON.stringify(ctx.request.body)}`)

  await next()
})
//挂载路由
app.router = router

// 注册路由
app.router()

// 捕获异常方式二
app.on('error', errorHandler)
module.exports = app