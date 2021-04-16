/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-04-15 22:27:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-15 23:32:43
 */
import { login, logout, opUsers } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    username: '',//用户名
    displayName: '',//中文展示名
    email: '',//邮箱
    phone: '',//手机号
    roleid: '',//所属角色ID
    departid: ''//所属部门ID
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    Object.assign(state, userInfo)
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { roleID } = response
        commit('SET_TOKEN', roleID)
        setToken(roleID)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      opUsers({
        'op': 'GET',
        // 'departid': state.departid
      }).then(response => {

        if (!response.succ) {
          return reject(response.errMsg)
        }

        const { username, displayName, email, phone, roleid, departid } = response

        commit('SET_USER_INFO', { username, displayName, email, phone, roleid, departid })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

