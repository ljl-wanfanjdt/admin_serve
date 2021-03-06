/**
 * @description 数据库链接封装
 */

const mysql = require('mysql2')

const config = require('./config')

const log = require('./log4js.config')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = config
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

connections.getConnection((err, coon) => {
  if (err) {
    log.error("数据库连接失败，请检查，error:" + err)
    return
  } else {
    log.info("数据库连接成功~")
  }
})

module.exports = connections.promise()