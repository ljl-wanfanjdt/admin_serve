const connection = require('../conf/database')
const log = require('../conf/log4js.config')
const { pageHandle } = require('../utils/index')
// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

class UserService {
  /**
   * @description 根据用户名查询用户
   * @param {*} name 用户名
   * @returns 
   */
  async getUserName(name) {
    const statement = `SELECT * FROM user_info WHERE user_name = ?; `
    return executeSql(statement, [name])
  }

  /**
   * @description 新增用户
   * @param {*} userInfo 新建用户信息
   * @returns 
   */
  async createUser(userInfo) {
    const { userName: user_name, password, age, telPhone: tel_phone, gender = 'M', fullName: full_name } = userInfo
    const statement = `
    INSERT INTO 
      user_info (user_name,password,age,tel_phone,gender,full_name) 
    VALUES 
      (?,?,?,?,?,?);`
    return executeSql(statement, [user_name, password, age, tel_phone, gender, full_name])
  }

  /**
   * @description 根据查询条件查询用户信息(列表)
   * @param {*} queryParams 查询参数 (分页参数,用户id,用户名)
   * @returns 
   */
  async queryUser(queryParams) {
    const { fullName = '', telPhone = '', occupationv = '', userId = '', currentPage = 1, pageSize = 10 } = queryParams
    let statement = `
    SELECT
	    * 
    FROM
      user_info 
    WHERE
      1 = 1 
  `
    if (userId) {
      statement += ` AND userId = '${userId}'`
    }
    if (fullName) {
      statement += ` AND full_name LIKE '%${fullName}%'`
    }
    if (telPhone) {
      statement += ` AND tel_phone = '${telPhone}'`
    }
    if (occupationv) {
      statement += ` AND occupationv = '${occupationv}'`
    }

    //分页创建时间倒序返回
    statement += ` ORDER BY create_time DESC LIMIT ${pageHandle(currentPage, pageSize)}, ${pageSize}`
    return handleSql(statement)
  }

  /**
 * @description 根据用户名获取用户密码
 * @returns 数据库操作结果
 */
  async getPassword(params) {
    const { userName } = params
    let statement = `SELECT password FROM user_info WHERE user_name = ?;`
    return executeSql(statement, [userName])
  }

  /**
 * @description 设置用户密码
 * @returns 数据库操作结果
 */
  async setPassword(params) {
    const { userName, password, userId } = params
    let statement = `UPDATE user_info SET password = ? WHERE user_name = '${userName}' AND id=${userId};`
    return executeSql(statement, [password])
  }

  /**
 * @description 设置用户密码
 * @returns 数据库操作结果
 */
  async disableUser(params) {
    const { userName, disable, userId } = params
    let statement = `UPDATE user_info SET disable = ? WHERE user_name = '${userName}' AND id=${userId};`
    return executeSql(statement, [disable])
  }

  /**
   * @description 更细男用信息
   * @param {*} newUserInfo 更新的用户信息
   */
  async updateInfo(newUserInfo) {
    // 前端点击修改,将整条用户信息包含的字段都传给后端,更新的值用最新的,没有更新的保持不变
    const { userName, age, fullName, telPhone, gender, disable, id } = newUserInfo

    const statement = `	
      UPDATE user_info 
      SET user_name = ?,
      age = ?,
      full_name = ?,
      tel_phone = ?,
      gender = ?,
      disable = ? WHERE id = ?
    `
    return executeSql(statement, [userName, age, fullName, telPhone, gender, disable, id])
  }
}

/**
 * @description 数据库sql操作封装
 * @author ljl
 * @param {*} sql 要执行的sql预编译语句
 * @param {*} data sql语句填充条件
 * @returns 数据库操作结果
 */
async function executeSql(sql, data) {
  try {
    const request = await connection.execute(sql, data)
    return request[0]
  } catch (error) {
    log.error(error)
  }
}

/**
 * @description 数据库sql操作封装,不进行预编译,预编译可选参数将报错,所以采取此方法
 * @author ljl
 * @param {*} sql 要执行的sql语句
 * @returns 数据库操作结果
 */
async function handleSql(sql) {
  try {
    const request = await connection.query(sql)
    return request[0]
  } catch (error) {
    log.error(error)
  }
}

module.exports = new UserService()