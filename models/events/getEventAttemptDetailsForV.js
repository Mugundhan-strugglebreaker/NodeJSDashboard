const db = require("../../DbConnect/DbConnect")

exports.getEventAttemptDetailsForV = (req,res)=>{
    let event_history_id = req.body.event_history_id
    let sql = "SELECT is_approved as ApprovedStatus,feedback_id , reaction_id , credits_gained from event_history_details WHERE event_history_details_id ="+event_history_id
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            if(result.length>0){
                let approvedStatus = result[0].ApprovedStatus
                if(approvedStatus ===0 ){
                    result = result.map(item=>{
                        return({
                            ...item,
                            "current_status":"Not Approved"
                        })
                    })
                    res.send(result[0])
                    res.end()
                }else{
                    let reaction_id = result[0].reaction_id
                    let feedback_id = result[0].feedback_id
                    let credits_gained = result[0].credits_gained
                    if(reaction_id===0){
                        let sqlForFeedback = "Select feedback from feedback where feedback_id="+feedback_id;
                        db.query(sqlForFeedback,(error,tempResult)=>{
                            if(error){
                                res.send(error)
                                res.end()
                            }else{
                                let feedback = tempResult[0].feedback
                                result = result.map(item =>{
                                    return(
                                        {
                                            ...item,
                                            "current_status":"Denied",
                                            "feedback":feedback

                                        }
                                    )
                                })
                                res.send(result[0])
                                res.end()
                            }
                        })
                    }else{
                        let sqlForFeedbackReaction = "SELECT feedback.feedback_id,reaction.reaction_id,reaction.heart,reaction.thumbs_up,reaction.fire,reaction.fire,reaction.lol,feedback.feedback from event_history_details JOIN feedback JOIN reaction on event_history_details.feedback_id = feedback.feedback_id AND event_history_details.reaction_id = reaction.reaction_id AND event_history_details.event_history_details_id ="+event_history_id
                        db.query(sqlForFeedbackReaction,(error,tempResult)=>{
                            if(error){
                                res.send(error)
                                res.end()
                            }else{
                                result = result.map(item=>{
                                    return({
                                        ...item,
                                        ...tempResult[0],
                                        "current_status":"Approved"
                                    })
                                })
                                res.send(result[0])
                                res.end()
                            }
                        })
                    }
                }
            }else{
                res.send(result)
                res.end()
            }
        }
    })
}