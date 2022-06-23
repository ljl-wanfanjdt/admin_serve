/**
 * @description 秘密加密
 */
const crypto = require('crypto')

/**
 * @description 密码加密方法封装
 * @param {string} password 待加密的密码
 * @returns {stringhex} 加密后字16进制符串
 */
function passwordCrypt(password) {

  // 选用sha256 算法进行加密
  const hash = crypto.createHash('sha256')
  // 加密处理
  hash.update(password)
  // 16进制展示
  return hash.digest('hex')
}

module.exports = passwordCrypt