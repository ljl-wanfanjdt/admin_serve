const connection = require('../conf/database')

// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

class UserService {
  async getUserName(name) {
    const statement = `SELECT * FROM user_info WHERE user_name = ?; `
    return handleSql(statement, [name])
  }
  async createUser(userInfo) {
    const { userName: user_name, password, age, telPhone: tel_phone, gender = 'M' } = userInfo
    const statement = `
    INSERT INTO 
      user_info (user_name,password,age,tel_phone,gender) 
    VALUES 
      (?,?,?,?,?);`
    return handleSql(statement, [user_name, password, age, tel_phone, gender])
  }
}

/**
 * @description 数据库sql操作封装
 * @author ljl
 * @param {*} sql 要执行的sql预编译语句
 * @param {*} data sql语句填充条件
 * @returns 数据库操作结果
 */
async function handleSql(sql, data) {
  try {
    const request = await connection.execute(sql, data)
    return request[0]
  } catch (error) {
    console.log(error);
  }
}

module.exports = new UserService()