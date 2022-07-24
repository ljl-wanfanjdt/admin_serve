/**
 * @description 文件处理controller层
 */
const fs = require('fs')
const path = require('path')
const log4js = require('../conf/log4js.config')
class fileController {
  async avatar(ctx, next) {
    // console.log(ctx.req);
    const { filename, size, mimetype } = ctx.req.file
  }

  async downloadTemplate(ctx, next) {
    try {
      const filePath = path.resolve(__dirname, '../../uploads/template')
      // 设置响应mime文件类型,告诉浏览器处理方式
      ctx.response.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8')
      ctx.set("Content-Disposition", "attachment; filename=" + "user.xlsx")
      const filename = fs.readdirSync(filePath)
      ctx.body = fs.createReadStream(`${filePath}/${filename[0]}`)
      log4js.info('下载成功')
      await next()
    } catch (error) {
      log4js.error('下载失败')
    }
  }
}

module.exports = new fileController()