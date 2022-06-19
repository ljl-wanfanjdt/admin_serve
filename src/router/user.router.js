const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const getValidator = require('../middlewares/validate.middlewares')
const userValidator = require('../validator/user.validate')
const { create } = require('../controller/user.controller')
const { verifyRepregister, cryptPassword } = require('../middlewares/user.middlewares')
userRouter.post('/', (ctx, next) => {

})

userRouter.post('/register', getValidator(userValidator), verifyRepregister, cryptPassword, create)

module.exports = userRouter