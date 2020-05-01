// 登录授权中间件 判断用户token是否正确
module.exports = () => {
  return async (err, req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '权限过期，请重新登录！')
    let { email } = jwt.verify(token, app.get('secret'))
    assert(email, 401, '权限过期，请重新登录！')
    req.user = await userModel.findOne(email)
    assert(req.user, 401, '权限过期，请重新登录！')
    await next()
  }
}