/**
 * @description 用户 controller    
 */
const { createUser } = require('../services/user.service')
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body
    const result = await createUser(userInfo)
    // 返回数据
    ctx.body = result
  }
}

module.exports = new UserController()