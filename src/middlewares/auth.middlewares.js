const { getUserName } = require('../services/user.service')
const errorTypes = require('../constants/error-types')
const handlePassword = require('../utils/password.encrypt')
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

module.exports = {
  verifyUserLogin
}

