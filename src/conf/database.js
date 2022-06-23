/**
 * @description 数据库链接封装
 */

const mysql = require('mysql2')

const config = require('./config')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSEORD, MYSQL_DATABASE } = config
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSEORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

connections.getConnection((err, coon) => {
  if (err) {
    console.log("数据库连接失败，请检查，error:" + err)
    return
  } else {
    console.log("数据库连接成功~")
  }
})

module.exports = connections.promise()