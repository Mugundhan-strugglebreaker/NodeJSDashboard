const db = require("../../DbConnect/DbConnect")

exports.deleteEvent = (req,res) =>{
    let event_id = req.body.event_id
    let sqlForDeleteEventHistory = `DELETE from event_history where event_id=${event_id}`
    db.query(sqlForDeleteEventHistory,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let sqlForDeleteEvent = `DELETE from event where event_id=${event_id}`
            db.query(sqlForDeleteEvent,(error,finalResult)=>{
                if(error){
                    res.send(error)
                    res.end()
                }else{
                    res.send(finalResult)
                    res.end()
                }
            })
        }
    })
}