const dotenv = require('dotenv')

// 挂载环境变量到process
dotenv.config()

module.exports = {
  APP_HOST,
  APP_PORT
} = process.env