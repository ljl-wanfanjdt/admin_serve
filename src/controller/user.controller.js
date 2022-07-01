/**
 * @description 用户 controller    
 */
const { createUser, queryUser, setPassword, disableUser } = require('../services/user.service')
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

  /**
  * @description 修改用户密码
  */
  async ChangePassword(ctx, next) {
    const result = await setPassword(ctx.request.body)
    if (result.affectedRows > 0) {
      ctx.body = "修改成功"
    } else {
      ctx.body = "修改失败"
    }
  }

  /**
  * @description 用户禁用/开启
  */
  async userDisable(ctx, next) {
    const result = await disableUser(ctx.request.body)
    if (result.affectedRows > 0) {
      ctx.body = "操作成功"
    } else {
      ctx.body = "操作失败"
    }
  }
}

module.exports = new UserController()