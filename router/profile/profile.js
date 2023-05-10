// 导入express
const express = require('express')

const router = express.Router()

// 导入操作函数
const profile_handle = require('../../models/Profile')
// 添加
router.post('/add',profile_handle.addProfile)


// 获取全部信息
router.get('/get',profile_handle.getProfile)
// 获取单个信息
router.get('/get/:id',profile_handle.getProfileOne)

// 编辑信息
router.post('/edit/:id',profile_handle.updatePro)

// 删除信息
router.delete('/delete/:id',profile_handle.deletePro)

module.exports = router