// 导出为一个函数接收app参数，这样就可以在login.js中使用全局的app
module.exports = app => {
  // 导入生成token的包，需安装 yarn add jsonwebtoken
  const jwt = require('jsonwebtoken')
  
  // const assert = require('http-assert')
  let { Router } = require('express')
  let router = new Router()
  app.use('/', router)

  // 引入用户模型对象
  let userModel = require('../module/userModel')

  router.get('/', (req, res) => {
    res.send('ok')
  })
  // 登录接口
  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // 验证邮箱和密码正则
    const emailReg = /^([A-Za-z0-9_\-\.]{1,8})+\@([A-Za-z0-9_\-\.]{1,8})+\.([A-Za-z]{2,4})$/
    const passwordReg = /^[A-Za-z0-9_\.]{6,16}$/
    if (!emailReg.test(email)) {
      res.send({ message: '请输入正确的邮箱', status: 1 })
      return
    } else if (!passwordReg.test(password)) {
      res.send({ message: '至少输入6个字符，最多不超过16个字符,允许小数点和下划线', status: 2 })
      return
    }
    // 判断用户是否注册
    try {
      // 由于password设置了select:false，这里需要使用 .select('+password')来查询此字段
      let findResult = await userModel.findOne({ email }).select('+password')
      if (!findResult) {
        return res.send({ message: '用户尚未注册！', status: 3 })
      }
      // 判断密码是否正确 compareSync()比较明文密文是否匹配
      const isValid = require("bcryptjs").compareSync(password, findResult.password)
      if (!isValid) {
        return res.send({ message: '邮箱或密码错误！', status: 4 })
      }
      // 返回token 
      // jwt.sign()生成touken  这里的router.get不是创建路由，而是获取全局设置的配置 server.js中设置了app.set('secret','code7s');code7s是秘钥
      const token = jwt.sign({ email: findResult.email }, app.get('secret'))
      res.send({ token: token, status: 0, message: "登录成功！" })
    } catch (err) {
      console.log(err);
      res.status(422).send({ message: '出问题了,请稍后再试！' })
    }
  })
}