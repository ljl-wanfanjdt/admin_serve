const { executeSql, handleSql } = require('../services/service')

class RoleService {
  async getRoleService() {
    const statement = `SELECT * FROM role`
    return await executeSql(statement)
  }
  async createRoleService(roleInfo) {
    const { roleName, remark, createName } = roleInfo
    const statement = `
    INSERT INTO 
      role (role_name,remark,create_name) 
    VALUES 
      (?,?,?)
    `
    return await executeSql(statement, [roleName, remark, createName])
  }
}

module.exports = new RoleService()
