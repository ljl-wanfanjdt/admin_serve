
/**
 * @description user相关中间件
 * @author ljl
 */
const userService = require('../services/user.service')
const handlePassword = require('../utils/password.encrypt')
const errorTypes = require('../constants/error-types');
/**
 * @description 用户注册,是否重复注册
 */

async function verifyRepregister(ctx, next) {
  const { userName, password } = ctx.request.body
  const request = await userService.getUserName(userName)

  // request.length>1 说明注册过
  if (request.length) {
    // ctx.throw(409)
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next()
}

/**
 * @description 密码进行加密的中间件
 * @param {object} ctx 上下文
 * @param {function} next 下一个中间件
 */
async function cryptPassword(ctx, next) {

  // 对密码进行加密
  ctx.request.body.password = handlePassword(ctx.request.body.password)
  await next()
}

// 密码验证
async function verifyPassword(ctx, next) {
  const userName = ctx.request.body
  const res = await userService.getPassword(userName)
  if (ctx.request.body.password == res[0].password) {
    await next()
  } else {
    ctx.app.emit('error', error, ctx)
  }
}

//新旧密码验证 
async function VerifyNewPassword(ctx, next) {
  const { newPasswordFirst, newPasswordSecond } = ctx.request.body
  if (newPasswordFirst === newPasswordSecond) {
    ctx.request.body.password = handlePassword(newPasswordFirst)
    await next()
  } else {
     return ctx.app.emit('error', error, ctx);
  }
}
module.exports = {
  verifyRepregister,
  cryptPassword,
  verifyPassword,
  VerifyNewPassword
}