// 导入数据库
const db = require('../db/index')
// 导入加密内容
const bcrypt = require('bcrypt')
// 默认头像
const gravatar = require('gravatar');
// 导入jwt
const jwt = require('jsonwebtoken')
// 导入加密语句
const keys = require('./keys')
exports.getUser = (req, res) => {
    res.json({ msg: 'login works' })
}

// 注册用户
exports.postUser = (req, res) => {
    const sql = `select * from ev_users where email='${req.body.email}'`;
    db.query(sql, (err, results) => {
        if (err) return res.send(err)
        if (results.length > 0) return res.status(400).json('邮箱已被注册')
        // 加密密码
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const avatar = gravatar.url('req.body.email', { s: '200', r: 'pg', d: 'mm' });
        const sql = `insert into ev_users set ?`
        db.query(sql, { avatar: avatar, name: req.body.name, email: req.body.email, password: req.body.password,identity:req.body.identity }, (err, results) => {
            if (err) return res.send(err)
            if (results.affectedRows !== 1) return res.send('注册失败')
            res.send({
                status: 0,
                message: '注册成功',
            })
            
        })
    })
}

// 登陆
exports.userLogin = (req, res) => {
    
    const password = req.body.password
    // 查询数据库
    const sql = `select * from ev_users where email='${req.body.email}'`;
    db.query(sql,(err, results) => {
        if (err) return res.send(err)
        if (results.length !== 1) return res.send('用户不存在')
        // 判断密码
        const compareResult = bcrypt.compareSync(password, results[0].password);
        if (!compareResult) return res.send('密码错误')
        // 定义token规则
        // 去除密码和头像返回
        const user = { ...results[0], password: ""}
        const tokenStr = jwt.sign(user, keys.secret0rKey, { expiresIn: '10h' })
        res.send({
            status: 0,
            message: "登陆成功",
            token: 'Bearer ' + tokenStr
        })
        // return user
    })
}

// exports.getLogin = (req, res) => {
//     res.json(req.user)
// }