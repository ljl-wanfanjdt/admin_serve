/**
 * @description 用户 controller    
 */
const { createUser, queryUser } = require('../services/user.service')
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body
    const result = await createUser(userInfo)
    // 返回数据
    ctx.body = result
  }

  // 查询用户列表
  async queryUserList(ctx, next) {
    const queryParams = ctx.request.body
    const result = await queryUser(queryParams)
    ctx.body = result
  }
}

module.exports = new UserController()