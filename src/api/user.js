import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: 'username=' + data.username + '&password=' + data.password
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function list() {
  return request({
    url: '/admin/user/list',
    method: 'get'
  })
}

export function lock(row) {
  row.isLocked = !row.isLocked
  return request({
    url: '/admin/user/lock',
    method: 'post',
    data: row
  })
}
