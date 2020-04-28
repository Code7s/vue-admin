/* 
此模块使用mongoose来连接数据库
*/
let mongoose = require('mongoose')
const DB_NAME = 'vue-admin'
const DB_URL = 'localhost:27017'

// 暴露promise
module.exports = new Promise((res, rej) => {
  mongoose.set('useCreateIndex', true)
  // 设置连接哪个数据库
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('open', (err) => {
    if (!err) {
      console.log(`${DB_NAME}数据库连接成功!`)
      res()
    } else {
      rej(err)
    }
  })
})