/**
 * @description 角色controller
 */
const { getRoleService, createRoleService } = require('../services/role.service')
class RoleController {

  // 查询角色
  async getRole(ctx, next) {
    const result = await getRoleService()
    ctx.body = result
  }

  // 新增角色
  async createRole(ctx, next) {
    const userName = ctx.user.userName
    const createRoleParam = {
      "roleName": ctx.request.body.roleName,
      "remark": ctx.request.body.remark,
      "createName": userName
    }
    const result = await createRoleService(createRoleParam)
    ctx.body = result
  }
}

module.exports = new RoleController()