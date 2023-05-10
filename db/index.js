// 导入数据库组件
const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'hisystem'
})

module.exports = db