/* 注册路由 */
module.exports = app => {
  let { Router } = require('express')
  let router = new Router()
  app.use('/api', router)
  // 引入用户模型对象
  let userModel = require('../module/userModel')

  // 注册接口
  router.post('/register', async (req, res) => {
    const { user_name, email, password, res_password } = req.body
    // 4到16位（中文，字母，数字，下划线，减号）
    const nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{4,16}$/
    // 验证邮箱和密码正则
    const emailReg = /^([A-Za-z0-9_\-\.]{1,8})+\@([A-Za-z0-9_\-\.]{1,8})+\.([A-Za-z]{2,4})$/
    const passwordReg = /^[A-Za-z0-9_\.]{6,16}$/

    if (!nameReg.test(user_name)) {
      res.send({ message: '用户名不符合规范,最少2个汉字最多14个字母', status: 5 })
      return
    } else if (!emailReg.test(email)) {
      res.send({ message: '请输入正确的邮箱地址', status: 1 })
      // 只要一个验证失败就不走下面的if
      return
    } else if (!passwordReg.test(password)) {
      res.send({ message: '至少输入6个字符，最多不超过16个字符,允许小数点和下划线', status: 2 })
      return
    } else if (password !== res_password) {
      res.send({ message: '两次输入的密码不同,请再次输入！', status: 3 })
      return
    }
    // 操作数据库时，无法保证await一定能得到响应，尽量放在try中执行
    try {
      // 查询数据库是否存在该邮箱
      let findResult = await userModel.findOne({ email })
      if (findResult) {
        res.send({ message: '该邮箱已经被注册！', status: 4 })
      } else {
        // 确保数据存入数据库再响应注册成功
        await userModel.create({ user_name, email, password })
        res.send({ message: '注册成功！请返回登录', status: 0 })
      }
    } catch (err) {
      console.log(err)
      res.send('出问题了,请稍后再试！')
    }
  })
}