import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/material/list',
    method: 'get',
    params
  })
}
