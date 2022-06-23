const Router = require('koa-router')
const authRouter = new Router()

const getValidator = require('../middlewares/validate.middlewares')
const userValidator = require('../validator/user.validate')

const { verifyUserLogin } = require('../middlewares/auth.middlewares')

const { login } = require('../controller/auth.controller')
// 登录路由
/* 
    登录逻辑
    数据格式校验
    带着账号密码 去数据库查询 如果返回值 说明输入正确的账号密码 否则提示错误
    核实通过后 办法token 返回客户端 
  */
authRouter.post('/login', getValidator(userValidator), verifyUserLogin, login)
module.exports = authRouter