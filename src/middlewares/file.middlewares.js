const path = require('path')
const fs = require('fs')
const Multer = require('koa-Multer')
const log4js = require('../conf/log4js.config')
/**
 * @description multer报错
 * @param {*} ctx 
 * @param {*} next 
 */
function publicFileHandle(fnHandle) {
  return async function fileMiddle(ctx, next) {
    try {
      await fnHandle(ctx, next)
    } catch (error) {
      log4js.error(error)
    }
  }
}

/**
 * @description 上传multer封装
 * @author ljl
 * @param {*} filePath 保存文件目录
 * @param {*} filename 上传文件key
 * @returns upload.single 上传中间件
 */
function publicMulterHandle(filePath, filename) {
  const diskStorageOptions = {
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, filePath))
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname)
      cb(null, `${file.fieldname}-${Date.now()}${fileExt}`)
    }
  }
  const storage = Multer.diskStorage(diskStorageOptions)
  const upload = Multer({ storage: storage })
  /* 
    Multer 会添加一个 body 对象 以及 file 或 files 对象 到 koa 的 ctx.req 对象中。 
    body 对象包含表单的文本域信息，
    file 或 files 对象包含对象表单上传的文件信息。
    上传文件名必须为single中的字符串一致, 否则会报错
  */
  return upload.single(filename)
}

/**
 * @description 删除文件
 * @param {*} filePath 删除文件路径
 * @returns 
 */
function unlinkFileHandle(filePath) {
  return async function unlinkFileMiddle(ctx, next) {

    // 删除之前检查是否有改文件,有则拿到文件名,没有直接上传新文件
    const fileNames = fs.readdirSync(path.resolve(__dirname, filePath))
    if (fsDirs.length) {
      fs.unlink(path.resolve(__dirname, `${filePath}/${fileNames[0]}`), (err) => {
        if (err) {
          log4js.error(err)
        }
        log4js.info('删除成功')
      })
    }
    await next()
  }
}

module.exports = {
  publicFileHandle,
  publicMulterHandle,
  unlinkFileHandle
}