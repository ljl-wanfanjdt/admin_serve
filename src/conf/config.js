const dotenv = require('dotenv')

// 挂载环境变量到process
dotenv.config()

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSEORD
} = process.env