/* 
此模块用来创建模型对象
*/
let mongoose = require('mongoose')
let Schema = mongoose.Schema
// 引入bcryptjs加密，需先安装yarn add bcryptjs
var bcrypt = require('bcryptjs')
// 注册模块
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // 使用select:false 设置该字段在查询的时候不显示，如需查询使用 .select('+password')
    select: false,
    // 使用bcrypt加密,相比于md5加密更安全，因为它是不可逆的，同一数据每次转成的密文都不相同
    set(val) {
      return bcrypt.hashSync(val, 12)
    }
  },
  user_name: {
    type: String,
    default: '新用户'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  enable_flag: {
    type: Boolean,
    default: true
  }
})

//暴露模块对象
module.exports = mongoose.model('user', userSchema)