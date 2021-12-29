const db = require("../../DbConnect/DbConnect")

exports.getAllEvents =(req,res)=>{
    let sql = "SELECT event.event_id,event.event_name,event.event_desc,employee.emp_name as Admin,event.date,event.duration,event.credits,event_type.event_type_name,event.location,event.is_complete from event join event_type join employee on event_type.event_type_id = event.event_type_id and event.admin_id=employee.emp_id"
     db.query(sql,(err,result)=>{
         if(err){
             res.send(err)
             res.end()
         }else{
             let i =1
             result = result.map(item=>{
                 return(
                     {
                     ...item,
                     "id":i++,
                     "status": item.is_complete ? "Completed" : "Upcoming"
                     }

                 )

             })
             res.send(result)
             res.end()
         }
     })
}