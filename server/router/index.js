module.exports = app => {
  let { Router } = require('express')
  let router = new Router()
  app.use('/api', router)
  let authMiddleware = require('../middleware/auth')

  // 引入模型对象
  let userModel = require('../module/userModel')
  let userListModel = require('../module/userListModel')
  let asideModel = require('../module/asideModel')

  // 获取当前登录用户信息
  router.get('/user', authMiddleware(app), (req, res) => {
    res.send(req.user)
  })

  // 获取侧边栏分类
  router.get('/aside_list', async (req, res) => {
    try {
      let asideList = await asideModel.findOne({})
      res.send(asideList.aside)
    } catch (err) {
      console.log(err);
    }
  })

  // 添加用户
  router.post('/add_user', authMiddleware(app), async (req, res) => {
    const { user_name, email, role_name } = req.body
    // 验证客户端传过来的数据是否正确
    try {
      let findResult = await userModel.findOne({ email, user_name })
      let findResult2 = await userListModel.findOne({ email })
      if (!findResult) {
        // 验证用户邮箱是否注册
        return res.send({ message: '该用户尚未注册！', status: 1 })
      } else if (email !== findResult.email || user_name !== findResult.user_name) {
        // 验证用户名和邮箱是否匹配
        return res.send({ message: '该用户名与邮箱不匹配！', status: 2 })
      } else if (findResult2) {
        return res.send({ message: '该用户已经被添加！', status: 3 })
      } else {
        // 创建进数据库
        await userListModel.create({ user_name, email, role_name })
      }
      res.send({ message: '添加成功！', status: 0 })
    } catch (err) {
      console.log(err, findResult2);
      res.status(500).send({ message: '出错了，稍后再试！' })
    }
  })

  // 获取用户列表 (暂时全部获取无需分页)
  router.get('/user_list', authMiddleware(app), async (req, res) => {
    // const { pageNum, pageSize } = req.query
    let userListData = await userListModel.find()
    res.send(userListData)
  })
}