const Router = require('koa-router')
const { verifyToken } = require('../middlewares/auth.middlewares')
const { getUserRoleController, createUserRoleController } = require('../controller/user_role.controller')
const userRoleRouter = new Router({ prefix: '/userRole' })

// 查询某用户拥有的角色列表
userRoleRouter.get('/getUserRole', verifyToken, getUserRoleController)

/* 
  给某用户新增角色
    userId 用户id
    roleIds [roleid,role.id....] 角色id(一个用户多个角色)
*/
userRoleRouter.post('/createUserRole', verifyToken, createUserRoleController)

module.exports = userRoleRouter