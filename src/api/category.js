import request from '@/utils/request'

export function getCategoryList(params, cb) {
  return request({
    url: '/admin/category/list',
    method: 'get',
    params
  }).then((res) => {
    cb(res)
  })
}

export function getCategoryList2(params, cb) {
  return request({
    url: '/admin/category/list2',
    method: 'get',
    params
  }).then((res) => {
    cb(res)
  })
}

export function moveCategory(data, cb) {
  return request({
    url: '/admin/category/move',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}

export function updateCategory(data, cb) {
  return request({
    url: '/admin/category/update',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}

export function delCategory(data, cb) {
  return request({
    url: '/admin/category/del',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}
