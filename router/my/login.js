const express = require('express')

const router = express.Router()

// 导入处理登陆的函数
const login_handle = require('../../models/usLogin')

// 登陆
router.get('/current',login_handle.usLogin)


module.exports = router