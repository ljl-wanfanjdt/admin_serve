const jwt = require('jsonwebtoken')
const { getUserName } = require('../services/user.service')
const errorTypes = require('../constants/error-types')
const handlePassword = require('../utils/password.encrypt')
const log = require('../conf/log4js.config')
const { PUBLIC_KEY } = require('../conf/config')
/**
 * @description 登录信息校验
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
async function verifyUserLogin(ctx, next) {
  const { userName, password } = ctx.request.body

  // 账号是否正确
  const result = await getUserName(userName)
  const user = result.pop()
  if (!user) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 密码校验
  const toPassword = handlePassword(password)
  if (toPassword !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }

  // 将用户数据挂载到执行上下文对象(走到这一步表示验证通过了,下个中间件开始颁发令牌)
  ctx.user = user;
  await next();
}


/**
 * @description token认证
 * @param {*} ctx 
 * @param {*} next 
 */
async function verifyToken(ctx, next) {
  log.info('开始验证授权token')
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }

  // Bearer token认证
  const token = authorization.replace('Bearer ', '')
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    log.info('认证成功')
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

/**
 * @description 核实用户权限
 * @param {*} ctx 
 * @param {*} next 
 */
async function verifyPermission(ctx, next) {
  log.info('开始认证权限~~')
  const userId = ctx.params.userId
  const { id } = ctx.request.body
  if (id != userId) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyUserLogin,
  verifyToken,
  verifyPermission
}

