// 引入express
let express = require('express')
// 引入数据库连接模块
let db = require('./db/db.js')
// 创建app服务对象
let app = express()

// 全局设置秘钥  设置secret值为code7s
app.set('secret', 'code7s')

// 使用中间件，获取post请求体参数挂载到req.body上
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 数据库连接成功后再注册路由
db.then(() => {
  // 允许跨域访问
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-Requested-With,Authorization');
    next()
  })

  // 使用注册、登录路由，将全局app传给路由使用
  require('./router/login')(app)
  require('./router/register')(app)

}).catch((err) => {
  console.log('数据库连接失败！\n' + err);
})
// 监听7000端口
app.listen(7000, (err) => {
  err ? console.log(err) : console.log('服务器启动成功！\nhttp://localhost:7000');
})