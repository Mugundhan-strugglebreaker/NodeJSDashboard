const db = require("../../DbConnect/DbConnect")

exports.updateProfile = (req,res)=>{
    const updateProfileData = req.body
    delete updateProfileData.role
    let sql = `Update employee set ? where emp_id=${req.body.emp_id}`
    db.query(sql,updateProfileData,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send(result)
            res.end()
        }
    })
}