// 登录授权中间件 判断用户token是否正确
module.exports = () => {
  return async (err, req, res, next) => {
    const assert = require('http-assert')
    // 取得请求头中携带的token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '权限过期，请重新登录！')
    // 验证token和秘钥是否匹配
    let { email } = jwt.verify(token, app.get('secret'))
    assert(email, 401, '权限过期，请重新登录！')
    // 查询数据库是否有对应的用户
    req.user = await userModel.findOne(email)
    assert(req.user, 401, '权限过期，请重新登录！')
    await next()
  }
}