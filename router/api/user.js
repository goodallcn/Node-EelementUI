// 导入express
const express = require('express')

const router = express.Router()

// 函数
const userHandle = require('../../models/User')

//  导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入验证规则对象
const {reg_user_schema} = require('../../schema/user')

router.get('/test',userHandle.getUser)

// 注册用户
router.post('/register',userHandle.postUser)

// 登陆
router.post('/login',userHandle.userLogin)

// router.get('/current',userHandle.getLogin)

module.exports = router