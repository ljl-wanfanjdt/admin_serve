const connection = require('../conf/database')
const log = require('../conf/log4js.config')
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

module.exports = {
    executeSql,
    handleSql
}