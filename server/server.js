// 引入数据库连接模块
let db = require('./db/index')
// 引入模型对象
let userModel = require('./module/userModel.js')

  // 这里前面加 ; 是为了避免之前的代码没写;导致解析出错
  ; (async () => {
    // 等待数据库连接成功
    await db

    // 操作数据库
    let result = await userModel.findOne({ age: 20 })
    console.log(result);
  })()