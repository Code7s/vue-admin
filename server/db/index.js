/* 
此模块用来连接数据库
*/

let mongoose = require('mongoose')
const DB_NAME = 'vue-admin'
const DB_URL = 'lcalhost:27017'

// 暴露promise
module.exports = new Promise((res, rej) => {
  mongoose.set('useCreateIndex', true)
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('open', (err) => {
    if (!err) {
      console.log(`位于${DB_URL}的${DB_NAME}数据库连接成功！\n`)
      res()
    } else {
      rej(err)
    }
  })
})