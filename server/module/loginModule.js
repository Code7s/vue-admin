/* 
此模块用来创建模型对象
*/

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_name: {
    type: String,
    required: true
  },
  info: {
    type: Schema.Types.Mixed
  },
  data: {
    type: Date,
    default: Date.now()
  },
  enable_flag: {
    type: Boolean,
    default: true
  }
})

//暴露模块对象
module.exports = mongoose.model('login', loginSchema)