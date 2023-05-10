// 导入express
const express = require('express')

// 导入配置文件
const keys = require('./models/keys')

const app = express()

// 导入跨域组件
const cors = require('cors')

app.use(cors())

const joi = require('@hapi/joi')

// 解析组件
app.use(express.urlencoded({ extended: false }))

// 解析token中间件
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: keys.secret0rKey }).unless({ path: [/^\/api\//] }))



// 导入路由
const users = require('./router/api/user')
// 使用router
app.use('/api/users', users)

// 登陆路由
const userLogin = require('./router/my/login')
//  登陆
app.use('/my/users', userLogin)

// 导入profile路由
const profileRouter = require('./router/profile/profile.js')
app.use('/profile/users',profileRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.send(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.send('身份认证失败！')
    // 未知错误
    res.send(err)
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server runnong on port ${port}`);
})