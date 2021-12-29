const db = require("../../DbConnect/DbConnect")

exports.getEventParticipateDetails = (req,res)=>{
    let emp_id = req.body.emp_id
    let event_id = req.body.event_id
    let regStatus = 0
    let sqlForRegStatus = "SELECT is_attempt as RegStatus from event_history WHERE emp_id ="+emp_id+" AND event_id ="+event_id
    db.query(sqlForRegStatus,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            if(result.length>0){
                if(result[0].RegStatus==1){
                    regStatus = 2
                }else{
                    regStatus = 1
                }
            }
            let sqlForGetParticpateDetails ="SELECT event_history.event_history_id,employee.emp_name,event_history_details.credits_gained,reaction.reaction_id,reaction.heart,reaction.thumbs_up,reaction.fire,reaction.lol,feedback.feedback from event_history JOIN event_history_details JOIN feedback JOIN reaction JOIN employee on event_history.event_history_id = event_history_details.event_history_details_id AND event_history_details.feedback_id = feedback.feedback_id AND event_history_details.reaction_id = reaction.reaction_id AND event_id = "+event_id+" AND is_attempt = true  AND event_history.emp_id=employee.emp_id AND event_history_details.is_approved = true"
            db.query(sqlForGetParticpateDetails,(err,finalResult)=>{
                if(err){
                    res.send(err)
                    res.end()
                }else{
                    let i = 1
                    finalResult = finalResult.map(item=>{
                        return(
                            {
                                ...item,
                                "id":i++
                            }
                        )
                    })
                    finalResult = [{"regStatus":regStatus},...finalResult]
                    res.send(finalResult)
                    res.end()
                }
            })
            // res.send({'regStatus':regStatus})
            // res.end()
        }
    })
}