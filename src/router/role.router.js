const Router = require('koa-router')
const { verifyToken } = require('../middlewares/auth.middlewares')
const { getRole, createRole } = require('../controller/role.controller')
const roleRouter = new Router({ prefix: '/role' })

// 查询角色列表(前端传{},全量返回不做分页)
roleRouter.get('/getRole', verifyToken, getRole)

/* 
  新增角色
    roleName角色名
    remark 备注
    createName 创建人
*/
roleRouter.post('/createRole', verifyToken, createRole)

module.exports = roleRouter