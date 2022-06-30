const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const getValidator = require('../middlewares/validate.middlewares')
const {userValidator, passwordValidator} = require('../validator/user.validate')
const { create, queryUserList, ChangePassword } = require('../controller/user.controller')
const { verifyRepregister, cryptPassword, verifyPassword, VerifyNewPassword } = require('../middlewares/user.middlewares')
userRouter.post('/', (ctx, next) => {

})

// 注册用户路由
userRouter.post('/register', getValidator(userValidator), verifyRepregister, cryptPassword, create)

// 修改用户信息路由
userRouter.post('/modify/userInfo', getValidator(userValidator), verifyRepregister, cryptPassword, queryUserList)

//修改密码
/*
*入参
*"userName"
*"password"
*"newPasswordFirst"
*"newPasswordSecond"
*/
userRouter.post('/modify/userPasword',cryptPassword,verifyPassword,getValidator(passwordValidator),VerifyNewPassword,ChangePassword)

// 删除用户路由

// 获取用户列表
console.log(queryUserList);
userRouter.post('/getUserList', queryUserList)

module.exports = userRouter