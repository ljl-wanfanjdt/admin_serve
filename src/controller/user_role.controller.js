/**
 * @description 用户角色controller 用户-->角色 多对多需要用户角色关系表
 */
const { getUserRoleService, createUserRoleService } = require('../services//user-role.service')
class UserRoleController {
  async getUserRoleController(ctx, next) {
    const result = await getUserRoleService(ctx.user)
    ctx.body = result
  }
  async createUserRoleController(ctx, next) {
    const userId = ctx.user.id
    const createUserRoleParams = {
      userId,
      "roleIds": ctx.request.body.roleIds
    }
    const result = await createUserRoleService(createUserRoleParams)
    ctx.body = result[0]
  }
}

module.exports = new UserRoleController()