import request from '@/utils/request'

export function getLicenseList(params, cb) {
  return request({
    url: '/admin/license/list',
    method: 'get',
    params
  }).then((res) => {
    cb(res)
  })
}

export function updateLicense(data, cb) {
  return request({
    url: '/admin/license/update',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}

export function delLicense(data, cb) {
  return request({
    url: '/admin/license/del',
    method: 'post',
    data
  }).then((res) => {
    cb(res)
  })
}
