const { executeSql, handleSql } = require('../services/service')

class UserRoleService {

  // 根据用户信息多表关联查询此用户拥有的角色(用户表-->用户角色表--->角色表)
  async getUserRoleService(userInfo) {
    const { id } = userInfo
    const statement = `
    SELECT 
      us.id userId, us.user_name userName, us.full_name fullName,
      JSON_ARRAYAGG(JSON_OBJECT('id', role.id,'roleName', role.role_name)) roleInfo
    FROM 
      user_info us
    LEFT JOIN 
      user_role ur ON us.id = ur.user_id
    LEFT JOIN role 
      ON ur.role_id = role.id
    GROUP 
      BY us.id
    HAVING 
      us.id=?
`
    return await executeSql(statement, [id])
  }
  async createUserRoleService(createUserRoleParams) {
    const { userId, roleIds } = createUserRoleParams
    const insertArr = []
    for (let i = 0, l = roleIds.length; i < l; i++) {
      const statement = `
        INSERT INTO 
          user_role (user_id, role_id) 
        VALUES 
          (?,?)
      `
      insertArr.push(executeSql(statement, [userId, roleIds[i]]))
    }
    return Promise.all(insertArr)
  }
}

module.exports = new UserRoleService()
