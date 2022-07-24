/**
 * @description 用户登录参数校验
 * @author ljl
 */
const validator = require('./validate')
const LOGIN_SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z0-9\u4e00-\u9fa5_]+$',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    }
  },
  required: ['userName', 'password']
}

/**
 * @description 校验用户信息
 * @author ljl
 * @param {object} data 用户信息
 */

function loginValidator(data = {}) {
  return validator(LOGIN_SCHEMA, data)
}

module.exports = {
  loginValidator
}