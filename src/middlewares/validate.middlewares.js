/**
 * @description 检验数据中间件封装
 * @author ljl
 * @param {function} fn 校验函数
 * @return {function} 中间件函数
 */
const log = require('../conf/log4js.config')

const getUserValidate = (validatorFn) => {
  async function validatorMiddleware(ctx, next) {
    const data = ctx.request.body
    const error = validatorFn(data)
    if (error) {
      log.error(error)
      // 验证失败
      ctx.body = '验证失败'
      return
    }
    await next()
  }
  return validatorMiddleware
}


module.exports = getUserValidate