const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname)
/**
 * @description 批量初测路由
 * @author ljl 
 */
function useRouters() {
  fs.readdirSync(filePath).forEach(fileNameItem => {
    if (fileNameItem === 'index.js') return
    const router = require(`./${fileNameItem}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}
module.exports = useRouters