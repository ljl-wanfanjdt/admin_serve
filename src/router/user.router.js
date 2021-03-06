const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const getValidator = require('../middlewares/validate.middlewares')
const { userValidator, passwordValidator } = require('../validator/user.validate')
const { create, queryUserList, ChangePassword, userDisable, modifyUserInfo } = require('../controller/user.controller')
const { verifyRepregister, cryptPassword, verifyPassword, VerifyNewPassword } = require('../middlewares/user.middlewares')
const { verifyToken, verifyPermission } = require('../middlewares/auth.middlewares')
userRouter.post('/', (ctx, next) => {

})

// 注册用户路由
userRouter.post('/register', getValidator(userValidator), verifyRepregister, cryptPassword, create)

// 修改用户信息路由
userRouter.post('/modify/userInfo', getValidator(userValidator), verifyRepregister, cryptPassword, queryUserList)

//用户修改密码
/*
*入参
*"userName"
*"userId"
*"password"
*"newPasswordFirst"
*"newPasswordSecond"
*/
userRouter.post('/modify/userPasword', cryptPassword, verifyPassword, getValidator(passwordValidator), VerifyNewPassword, ChangePassword)

//管理员重置密码路由
/*
*入参
*"userName"
*"userId"
*"password" 此处password为默认密码
*/
userRouter.post('/reset/pasword', verifyToken, verifyPermission, cryptPassword, ChangePassword)

// 用户开启/禁用开关路由
/*
*入参
*"userName"
*"userId"
*"disable" 
*/
userRouter.post('/disable', verifyToken, verifyPermission, userDisable)

/* 
  获取用户列表
  next--核实是否登录
  next--获取用户列表
*/
userRouter.post('/getUserList', verifyToken, queryUserList)

/*
  修改用户信息
  next--核实是否登录
  next--核实是否拥有权限(管理员,当前登录用户本身拥有权限)
  next--修改用户信息
*/
userRouter.patch('/modifyUserInfo/:userId', verifyToken, verifyPermission, modifyUserInfo)
module.exports = userRouter