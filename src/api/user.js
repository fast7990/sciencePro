/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2021-04-15 22:27:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-15 23:42:15
 */
import request from '@/utils/request'


/**
 * @name:
 * @test: test font
 * @msg: 登录接口
 * @param {'username': '','password': ''}
 * @return {*}
 */
export function login(data) {
  return request({
    url: '/frontapi/apis/views/login/',
    method: 'post',
    data
  })
}


/** 用户操作
 * @name:
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 * 
 * # 查询用户
   # departid参数不填写时返回所有用户
      data = {
        'op': 'GET',
        'departid': '部门ID(可选参数)'
    }
    # 新增用户
    data = {
      'op': 'PUT',
      'username': '',
      'displayName': '',
      'password': '用户的密码',
      'email': '',
      'phone': '',
      'roleid': '',
      'departid': ''
    }
    # 修改用户
    data = {
      'op': 'POST',
      'username': '',
      'displayName': '',
      'email': '',
      'phone': '',
      'roleid': '',
      'departid': ''
    }
    # 修改密码
    data = {
      'op': 'OPTION',
      'username': '',
      'password': ''
    }

    resp = {
      'succ': True,
      'errMsg': '修改密码成功'
    }

    # 批量删除用户（单独删除也用这个）
    data = {
      'op': 'DEL',
      'usernames': ['用户1', '用户2']
    }

    resp = {
      'succ': True,
      'errMsg': '删除成功'
    }
 */
export function opUsers(data) {
  return request({
    url: '/frontapi/apis/views/opusers/',
    method: 'post',
    data
  })
}

/**
 * @name:
 * @test: test font
 * @msg: 登出
 * @param {*}
 * @return {*}
 */
export function logout() {
  return request({
    url: '/frontapi/apis/views/logout/',
    method: 'post',
    data: {}
  })
}

/**
 * @name:
 * @test: test font
 * @msg: 校验登录状态
 * @param {*}
 * @return {*}
 */
export function checkLogin() {
  return request({
    url: '/frontapi/apis/views/checkLogin/',
    method: 'post',
    data: {}
  })
}