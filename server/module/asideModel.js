let mongoose = require('mongoose')
let Schema = mongoose.Schema
// 注册模块
let asideSchema = new Schema({
  aside: {
    type: Array,
    default: []
  }
})

//暴露模块对象
module.exports = mongoose.model('asides', asideSchema)