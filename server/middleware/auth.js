// 登录授权中间件 判断用户token是否正确
module.exports = app => {
  let userModel = require('../module/userModel')
  let jwt = require('jsonwebtoken')
  return async (req, res, next) => {
    // 判断用户是否有权限
    try {
      // 取得请求头中携带的token
      const token = String(req.headers.authorization || '').split(' ').pop()
      // 验证token和秘钥是否匹配
      let { email } = jwt.verify(token, app.get('secret'))
      // 查询数据库是否有对应的用户
      req.user = await userModel.findOne({email})
    } catch (err) {
      // token是伪造或者没有token时返回401状态码
      res.status(401).send({
        message: '权限过期，请重新登录！'
      })
    }
    await next()
  }
}