/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-04-15 22:27:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-16 23:56:07
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '教育部考试中心项目管理系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}