const db = require("../../DbConnect/DbConnect");

exports.eventParticipate = (req,res)=>{
    let feedback = req.body.feedback
    let event_history_id = req.body.event_history_id
    let sqlForMakeAttempTrue = "UPDATE event_history set is_attempt=true WHERE event_history_id ="+event_history_id;
    db.query(sqlForMakeAttempTrue,(err,resultForMakeAttempt)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let sqlForMakeAnEntryFeedback = "INSERT into feedback(feedback) values(?)"
            db.query(sqlForMakeAnEntryFeedback,feedback,(error,resultForFeedback)=>{
                if(error){
                    res.send(error)
                    res.end()
                }else{
                    let feedback_id = resultForFeedback.insertId
                    let sqlForEventHistoryDetails = "INSERT into event_history_details(event_history_details_id,is_approved,feedback_id,credits_gained,reaction_id) values("+event_history_id+","+false+","+feedback_id+","+0+","+0+")";
                    db.query(sqlForEventHistoryDetails,(errors,resultForEventHistoryDetails)=>{
                        if(errors){
                            res.send(errors)
                            res.end()
                        }else{
                            res.send(resultForEventHistoryDetails)
                            res.end()
                        }
                    })
                }
            })
            // res.send(resultForMakeAttempt)
            // res.end()
        }
    })
}