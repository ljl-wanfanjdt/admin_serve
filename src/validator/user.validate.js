/**
 * @description user数据格式校验
 * @author ljl
 */
const validator = require('./validate')
const USER_SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z0-9\u4e00-\u9fa5_]+$', //字母开头,字母下划线数字组成
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    fullName: {
      type: 'string',
      pattern: '^[\u4e00-\u9fa5]{0,}$',
      maxLength: 255,
      minLength: 2
    }
  },
  required: ['userName', 'password', 'fullName']
}

const PASSWORD_SCHEMA = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
  },
  required: ['password']
}

/**
 * @description 校验用户信息
 * @author ljl
 * @param {object} data 用户信息
 */

function userValidator(data = {}) {
  return validator(USER_SCHEMA, data)
}

/**
 * @description 密码校验
 * @author mllms
 * @param {object} data 用户信息
 */
function passwordValidator(data = {}) {
  return validator(PASSWORD_SCHEMA, data)
}

module.exports = {
  userValidator,
  passwordValidator
}