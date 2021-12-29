const db = require("../../DbConnect/DbConnect")

exports.regForEvent = (req,res)=>{
    let emp_id = req.body.emp_id
    let event_id = req.body.event_id
    let sql = "INSERT into event_history(emp_id,event_id,is_attempt) values("+emp_id+","+event_id+","+0+")"
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            res.send(result)
            res.end()
        }
    })
}