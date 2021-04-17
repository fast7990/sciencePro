/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-04-16 20:24:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-16 22:57:46
 */
import store from '@/store'

function checkPermission(el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roleID

    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value

            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    } else {
        // 角色ID, 0 = 系统管理员，3 = 业务主管，6 = 普通用户，数字越小权限越高，0为最高
        throw new Error(`need roles! Like v-permission="['0']"`)
    }
}

export default {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
}