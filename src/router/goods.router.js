const Router = require('koa-router')
const goodsRouter = new Router({ prefix: '/goods' })
const { verifyToken, verifyPermission } = require('../middlewares/auth.middlewares')
const {addGoodsInfo,delManifest,editManifest,inquireManifestList} = require('../controller/goods.controller')

/*
录入磅单
入参：
{
    "goodsName":"化工焦",
    "norm":"112",
    "gross":"1112",
    "net":"12",
    "tare":"222",
    "unit":"kg",
    "driver":"张三",
    "weigher":"李斯",
    "licensePlate":"甘A222223",
    "weighingTime":"2022-7-28 15:06:07"
}
*/
goodsRouter.post('/input', verifyToken, verifyPermission, addGoodsInfo)
/*
删除磅单
*/
goodsRouter.post('/del',verifyToken, verifyPermission, delManifest)
/*
修改磅单
入参：
{
    "manifestId":"3"
    "goodsName":"化工焦",
    "norm":"112",
    "gross":"1112",
    "net":"12",
    "tare":"222",
    "unit":"kg",
    "driver":"张三",
    "weigher":"李斯",
    "licensePlate":"甘A222223",
    "weighingTime":"2022-7-28 15:06:07"
}
*/
goodsRouter.post('/edit', verifyToken, verifyPermission, editManifest)

/*
查询磅单列表
入参：
{
    
}
*/
goodsRouter.post('/inquire', verifyToken, verifyPermission, inquireManifestList)

module.exports = goodsRouter