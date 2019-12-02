import request from '@/utils/request'

export function getMaterialList(params, cb) {
  return request({
    url: '/admin/material/list',
    method: 'get',
    params
  }).then((res) => {
    cb(res)
  })
}

export function getMaterialFiles(id, cb) {
  return request({
    url: '/admin/material/files',
    method: 'get',
    params: { id: id }
  }).then((res) => {
    cb(res)
  })
}

export function updateMaterial(params, cb) {
  return request({
    url: '/admin/material/update',
    method: 'post',
    data: params
  }).then((res) => {
    cb(res)
  })
}

export function delMaterial(id, cb) {
  const data = { id: id }
  return request({
    url: '/admin/material/del',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}
