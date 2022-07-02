/**
 * @description 授权中间件,主要是给已经登录用户添加令牌token(jwt方式)
 */
const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../conf/config')

class AuthController {
  async login(ctx, next) {
    const { id, user_name: userName } = ctx.user
    const token = jwt.sign({ id, userName }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    ctx.body = { id, userName, token }
  }

  async success(ctx, next) {
    ctx.body = "授权成功~"
  }
}
module.exports = new AuthController()
