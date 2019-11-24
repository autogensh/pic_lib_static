import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/license/list',
    method: 'get',
    params
  })
}

export function editLicense(data, cb) {
  return request({
    url: '/license/edit',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}

export function addLicense(data, cb) {
  return request({
    url: '/license/add',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}

