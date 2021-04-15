/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-04-15 22:27:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-15 23:39:03
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return str != ""
}
