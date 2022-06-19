const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const router = require('./router/index')

// 创建app
const app = new Koa()
app.use(bodyParser())
//挂载路由
app.router = router

// 注册路由
app.router()

module.exports = app