// 导入数据库
const db = require('../db/index')

// 新增
exports.addProfile = (req,res)=>{
    const pro = req.body
    const sql = `insert into ev_profile set ?`
    db.query(sql,{type:pro.type,describe:pro.describe,incode:pro.incode,expeend:pro.expeend,cash:pro.cash,remark:pro.remark},(err,results)=>{
        if(err) return res.send(err)
        if(results.affectedRows !== 1) return res.send('添加失败')
        res.send('添加成功')
    })
}

// 获取全部信息
exports.getProfile = (req,res)=>{
    const sql = `select * from ev_profile`
    db.query(sql,(err,results)=>{
        if(err) return res.send(err)
        res.send({
            status:0,
            message:'获取成功',
            data:results
        })
    })
}
// 获取单个信息
exports.getProfileOne = (req,res)=>{
    const sql = `select * from ev_profile where id=?`
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.send(err)
        if(results.length !== 1) return res.send('获取失败')
        res.send({
            status:0,
            message:'获取成功',
            data:results
        })
    })
    // res.send(req.params.id)
}

// 编辑信息
exports.updatePro = (req,res)=>{
    const sql = `select * from ev_profile where id = ?`
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.send(err)
        if(results.length === 0) return res.send('该信息不存在')
        const sql = `update ev_profile set ? where id = ? `
        db.query(sql,[req.body,req.params.id],(err,results)=>{
            if(err) return res.send(err)
            if(results.affectedRows !== 1) return res.send('编辑信息失败')
            res.send('编辑成功')          
        })
    })
}

// 删除信息
exports.deletePro = (req,res)=>{
    const sql = `select * from ev_profile where id = ?`
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.send(err)
        if(results.length === 0) return res.send('该信息不存在')
        const sql = `delete from ev_profile where id = ? `
        db.query(sql,req.params.id,(err,results)=>{
            if(err) return res.send(err)
            if(results.affectedRows !== 1) return res.send('删除信息失败')
            res.send('删除成功')          
        })
    })
}