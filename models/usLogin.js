// 导入数据库
const db = require('../db/index')


exports.usLogin = (req,res)=>{
    res.send(req.user)
}