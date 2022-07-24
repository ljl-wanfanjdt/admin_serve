const service = require('../services/service')
const { pageHandle } = require('../utils/index')

class GoodsServier {
   /**
   * @description 录入磅单信息
   * @param {*} goodsInfo 磅单信息
   * @returns 
   */
  async  addManifest(goodsInfo) {
    const { goodsName: goods_name, norm, gross, net, tare, unit, driver, weigher, licensePlate:license_plate,weighingTime:weighing_time } = goodsInfo
    const statement = `
    INSERT INTO 
      goods (goods_name, norm, gross, net, tare, unit, driver, weigher, license_plate,weighing_time) 
    VALUES 
      (?,?,?,?,?,?,?,?,?,?);`
    return service.executeSql(statement, [goods_name, norm, gross, net, tare, unit, driver, weigher, license_plate,weighing_time])
  }
   /**
   * @description 删除磅单
   * @param {*} params 磅单id  磅单状态
   * @returns 
   */
  async delManifest(params) {
    try {
      const { state, manifestId } = params
      let statement = `UPDATE goods SET state = ? WHERE id = '${manifestId}';`
      return service.executeSql(statement, [state])
    } catch (error) {
      log.error(error)
    }
    
  }
  
   /**
   * @description 修改磅单
   * @param {*} params 磅单信息
   * @returns 
   */
  async editManifest(params) {
    try {
      const { manifestId:id,goodsName: goods_name, norm, gross, net, tare, unit, driver, weigher, licensePlate:license_plate,weighingTime:weighing_time } = params
      let statement = `UPDATE goods SET goods_name=?, norm=?, gross=?, net=?, tare=?, unit=?, driver=?, weigher=?, license_plate =?, weighing_time=? WHERE id = '${id}';`
      return service.executeSql(statement, [goods_name, norm, gross, net, tare, unit, driver, weigher, license_plate,weighing_time])
    } catch (error) {
      log.error(error)
    }
    
  }
  /**
   * @description 查询磅单列表
   * @param {*} params 查询条件
   * @returns 
   */
  async inquireManifestList(queryParams) {
    const { date = '', driverId = '', weigherId = '', factoryId = '', currentPage = 1, pageSize = 10 } = queryParams
    let statement = `
    SELECT
	    * 
    FROM
      goods 
    WHERE
      1 = 1 
  `
    if (date) {
      statement += ` AND userId = '${date}'`
    }
    if (driverId) {
      statement += ` AND full_name LIKE '%${driverId}%'`
    }
    if (weigherId) {
      statement += ` AND tel_phone = '${weigherId}'`
    }
    if (factoryId) {
      statement += ` AND occupationv = '${factoryId}'`
    }

    //分页创建时间倒序返回
    statement += ` ORDER BY create_time DESC LIMIT ${pageHandle(currentPage, pageSize)}, ${pageSize}`
    return service.handleSql(statement)
  }
  
}

module.exports=new GoodsServier()