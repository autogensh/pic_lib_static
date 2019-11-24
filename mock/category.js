import Mock from 'mockjs'

// const data = Mock.mock({
//   'items|30': [{
//     id: '@id',
//     name: '@sentence(10, 20)',
//     'isDelete|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })

const arr = [
  '平面广告',
  '电商淘宝',
  '装饰装修',
  '网页UI',
  '视频音频',
  '产品工业',
  'PPT模板',
  '背景',
  '设计元素',
  'Excel模板',
  '简历模板',
  'Word模板',
  '新媒体用图',
  '插画绘画',
  '字库',
  '艺术字',
  '摄影图库'
]

const data = Mock.mock({
  'items|17': [
    {
      id: '@id',
      'name|+1': arr,
      materialCount: '@integer(10, 5000)',
      'isDeleted|1': true,
      createBy: 'Admin',
      createAt: '@datetime',
      updateAt: '@datetime'
    }
  ]
})

export default [
  {
    url: '/category/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
