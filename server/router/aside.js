module.exports = app => {
  let { Router } = require('express')
  let router = new Router()
  let authMiddleware = require('../middleware/auth')
  app.use('/api', router)

  router.get('/aside_list', authMiddleware(), (req, res) => {
    // 侧边菜单列表结构
    const asideList = [
      {
        id: 1,
        title: '用户管理',
        children: [
          { id: 1, title: '用户列表' }
        ]
      },
      {
        id: 2,
        title: '权限管理',
        children: [
          { id: 2, title: '角色列表' },
          { id: 3, title: '权限列表' }
        ]
      },
      {
        id: 3,
        title: '商品管理',
        children: [
          { id: 4, title: '商品列表' },
          { id: 5, title: '分类参数' },
          { id: 6, title: '商品分类' }
        ]
      },
      {
        id: 4,
        title: '订单管理',
        children: [
          { id: 7, title: '订单列表' }
        ]
      },
      {
        id: 5,
        title: '数据统计',
        children: [
          { id: 8, title: '商品统计' },
        ]
      }
    ]
    res.send(asideList)
  })
}