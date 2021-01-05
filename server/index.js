const express = require('express')
const app = express()
const initConfig = require('./config');

initConfig()

app.set('secret', 'userlogintoken')

// 使用中间件
app.use(require('cors')())
app.use(express.json())

// 连接数据库
require('./plugins/db')(app)


// 路由
require('./routers/admin')(app)

// 设置静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(3000, () => {
  console.log( 'http://localhost:3000' )
})