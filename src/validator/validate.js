const Ajv = require('ajv')

// 如果需要返回所有错误信息 则添加配置项option -->官网https://ajv.js.org/guide/getting-started.html
const ajv = new Ajv({})

/**
 * @description 校验函数
 * @author ljl
 * @param {object} schema 检验规则
 * @param {object} data 待校验数据
 * @return 校验结果
 */
function validator(schema, data) {
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) return validate.errors[0]
}
module.exports = validator


