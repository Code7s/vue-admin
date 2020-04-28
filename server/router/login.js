let { Router } = require('express')
let router = new Router()
// 引入用户模型对象
let userModel = require('../module/userModel')



// 登录接口
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // 验证邮箱和密码正则
  const emailReg = /^([A-Za-z0-9_\-\.]{2,8})+\@([A-Za-z0-9_\-\.]{2,8})+\.([A-Za-z]{2,4})$/
  const passwordReg = /^[A-Za-z0-9_\.]{6,16}$/

  if (!emailReg.test(email)) {
    res.send({ tip: '请输入正确的邮箱地址', status: 1 })
    return
  } else if (!passwordReg.test(password)) {
    res.send({ tip: '至少输入6个字符，最多不超过16个字符,允许小数点和下划线', status: 1 })
    return
  }

  try {
    // 判断用户是否注册
    let findResult = await userModel.findOne({ email }).select('+password')
    if (!findResult) {
      return res.status(422).send({ message: '用户尚未注册！' })
    }
    // 判断密码是否正确
    const isValid = require("bcryptjs").compareSync(password, findResult.password)
    if (!isValid) {
      return res.status(422).send({ message: '密码错误！' })
    }
    // 返回token 需安装 yarn add jsonwebtoken
    const jwt = require('jsonwebtoken')
    // 生成touken 秘钥是code7s
    const token = jwt.sign({ password: findResult.password }, 'code7s')
    res.send({ token })

  } catch (err) {
    console.log(err);
    res.send('出问题了,请稍后再试！')
  }
})

module.exports = router