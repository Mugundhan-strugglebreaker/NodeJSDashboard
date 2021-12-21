exports.getFeaturedInfo=(req,res)=>{
    console.log(req.body)
    const role = req.body.role
    const id = req.body.id
    console.log(role+" "+id);
    //let sql 
    if(role==='A'){
        let sql = "SELECT count(*) as count,SUM(credits) as credits from event WHERE admin_id ="+id;
        db.query(sql,(err,result)=>{
            if(err){
                res.send(err)
                res.end()
            }else{
                res.send(result[0])
                res.end()
            }
        })
    
    }else{
        let sql_regCount = "SELECT count(*) as RegCount from event_history WHERE emp_id="+id+" AND is_attempt="+false
        db.query(sql_regCount,(err,result_1)=>{
            if(err){
                res.send(err)
                res.end()
            }else{
                let RegCount = result_1[0].RegCount
                let sql_attempCount = "SELECT count(*) as AttemptCount,sum(event_history_details.credits_gained) as credits from event_history JOIN event_history_details on event_history_id = event_history_details.event_history_details_id AND is_attempt="+true+" AND emp_id ="+id
                db.query(sql_attempCount,(error,result_2)=>{
                    if(error){
                        res.send(error)
                        res.end()
                    }else{
                        let AttemptCount = result_2[0].AttemptCount
                        let credits = result_2[0].credits
                        const data = {
                            'RegCount':RegCount+AttemptCount,
                            'AttemptCount':AttemptCount,
                            "Credits":credits
                        }
                        res.send(data)
                        res.end()
                    }
                })
            }
        })
    }
}