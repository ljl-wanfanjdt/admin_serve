/**
 * @description 检验数据中间件
 * @author ljl
 * @param {function} fn 校验函数
 * @return {function} 中间件函数
 */
const getUserValidate = (validatorFn) => {
  async function validatorMiddleware(ctx, next) {
    const data = ctx.request.body
    const error = validatorFn(data)
    if (error) {
      console.log(error);
      // 验证失败
      ctx.body = '验证失败'
      return
    }
    await next()
  }
  return validatorMiddleware
}


module.exports = getUserValidate