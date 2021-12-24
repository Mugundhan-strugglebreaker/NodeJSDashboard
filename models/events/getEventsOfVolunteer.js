const db = require("../../DbConnect/DbConnect")

exports.getEventsOfVolunteer = (req,res)=>{
    let emp_id = req.body.emp_id
    let sql = "SELECT event.event_id,event_history.event_history_id,event.event_name,event_type.event_type_name,event.event_desc,event.duration,event.date,event.location,event.credits,employee.emp_name as Admin,if(event_history.is_attempt,'Attempted','Registered') as status from event_history JOIN event JOIN employee JOIN event_type on event_history.event_id = event.event_id AND event_history.emp_id ="+emp_id+" AND event.admin_id = employee.emp_id AND event.event_type_id = event_type.event_type_id"
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            let i = 1
            result = result.map(item=>{
                return (
                    {
                        ...item,
                        "id":i++
                    }
                )
            })
            res.send(result)
            res.end()
        }
    })
}