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
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

module.exports = passwordCrypt