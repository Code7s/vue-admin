let mongoose = require('mongoose')
let Schema = mongoose.Schema
// 注册模块
let userListSchema = new Schema({
  user_name: {
    type: String,
    default: '新用户'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role_name:{
    type: String,
    default: '普通用户'
  },
  user_status: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

//暴露模块对象
module.exports = mongoose.model('userlists', userListSchema)