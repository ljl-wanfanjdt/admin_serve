const jwt = require('jsonwebtoken')
const { getUserName } = require('../services/user.service')
const errorTypes = require('../constants/error-types');
async function verifyUserLogin(ctx, next) {
  const { userName, password } = ctx.request.body

  // 账号是否正确
  const result = await getUserName(userName)
  const user = result.pop()
  if (!user) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyUserLogin
}

