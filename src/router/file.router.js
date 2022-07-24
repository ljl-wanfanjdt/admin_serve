const Router = require('koa-router')
const fileRouter = new Router({ prefix: '/file' })
const { verifyToken } = require('../middlewares/auth.middlewares')
const { publicFileHandle, publicMulterHandle, unlinkFileHandle } = require('../middlewares/file.middlewares')
const { avatar, downloadTemplate } = require('../controller/file.controller')

/* 
上传用户头像
  1.用户认证
  2.保存文件到本地服务器
  3.将文件信息保存至数据库
  4.生成头像地址,更新高用户信息表
  5.上传头像完成
*/
fileRouter.post('/upload/avatar', verifyToken, publicFileHandle(publicMulterHandle('../../uploads/avatar', 'avatar')), avatar)

// 上传榜单模板
fileRouter.post('/upload/template', verifyToken, unlinkFileHandle('../../uploads/template'), publicFileHandle(publicMulterHandle('../../uploads/template', 'template')), avatar)

// 导出模板
fileRouter.get('/download/template', verifyToken, downloadTemplate)
module.exports = fileRouter
