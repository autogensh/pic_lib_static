// import Mock from 'mockjs'
//
// const data = Mock.mock({
//   'items|30': [
//     {
//       id: '@id',
//       title: '@sentence(10, 20)',
//       'status|1': ['published', 'draft', 'deleted'],
//       author: 'name',
//       display_time: '@datetime',
//       pageviews: '@integer(300, 5000)'
//     }
//   ]
// })

const data = {
  items: [
    {
      id: 1,
      title: 'CCE协议',
      content: '<p>Creative Commons （Exclusive distribution channel）</p>' +
        '<p><b class="warn">千图网内容详情页标示为（CCE协议）的作品，即遵循此授权协议，版权归属设计师与千图网共有。</b></p>' +
        '<p>CCE是千图网根据作品版权归属情况特别制定的一种特有的版权授权模式。您只需要购买网站VIP会员，在会员有效期以及VIP授权权限内，可以免费下载获取作品使用权，会员过期后，在会员有效期内下载并使用的作品可永久使用，不受时间、地域等的限制，且使用时无需署名。</p>' +
        '<p>您可以在授权范围内使用这张作品，如：<br>' +
        '- <b class="warn">可商用</b>，也可学习，交流使用。<br>' +
        '- <b class="warn">可下载，可编辑修改</b>这些作品。<br>' +
        '- 使用时<b class="warn">无需署名</b><br>' +
        '</p>' +
        '<p>您不能：<br>' +
        '- 转让，出售或出租任何千图网的作品（或千图网内容的修改版本）。<br>' +
        '- 分发千图网的作品。<br>' +
        '- 将千图网的作品储存在联机、脱机数据库或局域网中进行共享。<br>' +
        '- 将千图网的作品（或千图网内容的修改版）提供给他人或其他机构，企业下载。<br>' +
        '- 将千图网作品的版权占据为自己的版权。<br>' +
        '- 下载有效期到期后，不得就千图网的作品再进行任何形式的使用，如直接使用、再创作、加工、衍生使用等。<br>' +
        '- 其他千图网禁止以及法律禁止的事项。' +
        '</p>'
    }
  ]
}

export default [
  {
    url: '/license/list',
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
  },

  {
    url: '/license/edit',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/license/add',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
