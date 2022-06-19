const connection = require('../conf/database')

// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

class UserService {
  async getUserName(name) {
    const statement = `SELECT * FROM user_info WHERE user_name = ?; `
    const request = await connection.execute(statement, [name])
    return request[0]
  }
  async createUser(userInfo) {
    const { userName: user_name, password, age, telPhone: tel_phone, gender = 'M' } = userInfo
    const statement = `
    INSERT INTO 
      user_info (user_name,password,age,tel_phone,gender) 
    VALUES 
      (?,?,?,?,?);`
    const request = await connection.execute(statement, [user_name, password, age, tel_phone, gender])
    return request[0]
  }
}

module.exports = new UserService()