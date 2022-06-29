const connection = require('../conf/database')

// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

class UserService {
  async getUserName(name) {
    const statement = `SELECT * FROM user_info WHERE user_name = ?; `
    return executeSql(statement, [name])
  }
  async createUser(userInfo) {
    const { userName: user_name, password, age, telPhone: tel_phone, gender = 'M' } = userInfo
    const statement = `
    INSERT INTO 
      user_info (user_name,password,age,tel_phone,gender) 
    VALUES 
      (?,?,?,?,?);`
    return executeSql(statement, [user_name, password, age, tel_phone, gender])
  }
  async queryUser(queryParams) {
    const { fullName = '', telPhone = '', occupationv = '', userId = '' } = queryParams
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
    statement += `order by create_time desc;`
    return handleSql(statement)
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
    console.log(error);
  }
}

async function handleSql(sql) {
  try {
    const request = await connection.query(sql)
    return request[0]
  } catch (error) {
    console.log(error);
  }
}

module.exports = new UserService()