/**
 * @description 工具类封装
 * @author ljl
 */

/**
 * @description 分页参数封装
 * @param { Number} currentPage 当前页
 * @param {Number} offset 偏移量
 * @return {Number} count 条目
 */

function pageHandle(currentPage, offset) {
  return (currentPage - 1) * offset
}

module.exports = {
  pageHandle
}