const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
// 挂载环境变量到process
dotenv.config()


// 读取私秘钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))

// 读取公秘钥
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSEORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY