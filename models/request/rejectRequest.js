const db = require("../../DbConnect/DbConnect")

exports.rejectRequest = (req,res)=>{
    let feedback_id = req.body.feedback_id
    let feedback = req.body.feedback
    let event_history_details_id = req.body.event_history_details_id
    let sqlforUpdateFeedback = `UPDATE feedback set feedback='${feedback}' where feedback_id=${feedback_id}`
    db.query(sqlforUpdateFeedback,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let sqlForUpdateEventHistoryDetails = `UPDATE event_history_details set is_approved=true where event_history_details_id=${event_history_details_id}`
            db.query(sqlForUpdateEventHistoryDetails,(error,finalResult)=>{
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