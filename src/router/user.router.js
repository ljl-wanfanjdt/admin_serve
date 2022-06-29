const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const getValidator = require('../middlewares/validate.middlewares')
const userValidator = require('../validator/user.validate')
const { create, queryUserList } = require('../controller/user.controller')
const { verifyRepregister, cryptPassword } = require('../middlewares/user.middlewares')
userRouter.post('/', (ctx, next) => {

})

// 注册用户路由
userRouter.post('/register', getValidator(userValidator), verifyRepregister, cryptPassword, create)

// 修改用户信息路由
userRouter.post('/modify/userInfo', getValidator(userValidator), verifyRepregister, cryptPassword, create)

// 删除用户路由

// 获取用户列表
console.log(queryUserList);
userRouter.post('/getUserList', queryUserList)

module.exports = userRouter