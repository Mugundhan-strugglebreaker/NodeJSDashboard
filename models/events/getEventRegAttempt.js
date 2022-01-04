exports.getEventRegAttempt=(req,res)=>{
        let id = req.params.id
        let sql = "SELECT event_history_id,employee.emp_name,if(event_history.is_attempt,'Attended','Registered') as status from event_history JOIN employee on employee.emp_id = event_history.emp_id AND event_history.event_id ="+id;
        db.query(sql,(err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send(result)
            }
            res.end()
        })
}