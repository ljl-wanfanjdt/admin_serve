const errorTypes = require('../constants/error-types');
const log = require('../conf/log4js.config')
/**
 * @description 错误处理事件回调函数 Koa 应用扩展了内部 EventEmitter。
 * ctx.app.emit 发出一个类型由第一个参数定义的事件。对于每个事件，您可以连接 "listeners"，
 * 这是在发出事件时调用的函数
 * @param {Object} error 错误对象
 * @param {Object} ctx  上下文对象
 */
const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户名不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // 参数错误
      message = "密码是错误的~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  log.error(`${error.stack}`)
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler;