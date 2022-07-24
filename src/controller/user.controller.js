/**
 * @description 用户 controller    
 */
const { createUser, queryUser, setPassword, disableUser, updateInfo } = require('../services/user.service')
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body
    const result = await createUser(userInfo)
    // 返回数据
    ctx.body = result
  }

  /**
   * @description 查询用户列表
   * @author ljl
   * @param {*} ctx 
   * @param {*} next 
   */
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

  /**
   * @description 编辑用户信息
   * @param {*} ctx 
   * @param {*} next 
   */
  async modifyUserInfo(ctx, next) {
    // 权限认证通过
    const result = await updateInfo(ctx.request.body)
    ctx.body = result
  }
}

module.exports = new UserController()