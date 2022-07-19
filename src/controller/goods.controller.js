const { addManifest, delManifest,editManifest,inquireManifestList } = require('../services/goods.service')

class GoodsController {
    /**
   * @description 增加磅单
   * @param {*} ctx 
   * @param {*} next 
   */
    async addGoodsInfo(ctx,next) {
        const goodsInfo = ctx.request.body
        const result = await addManifest(goodsInfo)
        if (result.affectedRows > 0) {
            ctx.body = "录入成功"
        } else {
            ctx.body = "录入失败"
        }
    }
    /**
   * @description 删除磅单
   * @param {*} ctx 
   * @param {*} next 
   */
    async delManifest(ctx, next) {
        const params = ctx.request.body
        const result = await delManifest(params)
        if (result.affectedRows > 0) {
            ctx.body = "删除成功"
        } else {
            ctx.body = "删除失败"
        }
    }
    /**
   * @description 编辑磅单
   * @param {*} ctx 
   * @param {*} next 
   */
    async editManifest(ctx, next) {
        const params = ctx.request.body
        const result = await editManifest(params)
        if (result.affectedRows > 0) {
            ctx.body = "修改成功"
        } else {
            ctx.body = "修改失败"
        }
    }
    
    /**
   * @description 编辑磅单
   * @param {*} ctx 
   * @param {*} next 
   */
    async inquireManifestList(ctx, next) {
        const params = ctx.request.body
        const result = await inquireManifestList(params)
        if (result.affectedRows > 0) {
            ctx.body = result.data
        } else {
            ctx.body = "查询失败"
        }
    }
}
module.exports = new GoodsController()