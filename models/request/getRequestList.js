const db = require("../../DbConnect/DbConnect")

exports.getRequestList = (req,res)=>{
    let id = req.params.id
    let sql= "SELECT DISTINCT(event_history_details.event_history_details_id),event.event_name,event.date,event.credits,employee.emp_name,event_history_details.feedback_id from event JOIN event_history JOIN event_history_details JOIN employee JOIN feedback on event.admin_id ="+id+" and event_history.event_history_id=event_history_details.event_history_details_id AND event_history_details.is_approved = false AND employee.emp_id = event_history.emp_id and event_history.event_id = event.event_id"
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let i=1
            result = result.map(item=>{
                return({
                    ...item,
                    "id":i++
                })
            })
            res.send(result)
            res.end()
        }
    })
}