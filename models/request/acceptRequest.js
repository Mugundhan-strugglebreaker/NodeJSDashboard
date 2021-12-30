const db = require("../../DbConnect/DbConnect")

exports.acceptRequest = (req,res)=>{
    let event_history_details_id = req.body.event_history_details_id
    let credits = req.body.credits
    let sqlForCreateReaction =`Insert into reaction(heart,thumbs_up,fire,lol) value(${0},${0},${0},${0})`
    db.query(sqlForCreateReaction,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let reaction_id = result.insertId
            let sqlForUpdateEventHistoryDetails = `UPDATE event_history_details set reaction_id = ${reaction_id} , credits_gained = ${credits} , is_approved=true WHERE event_history_details_id = ${event_history_details_id}`
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