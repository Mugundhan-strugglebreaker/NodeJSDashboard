exports.getNotif = (req,res)=>{
    console.log(req.params.id)
    let id = req.params.id
    let sql= "select count(*) as notif from event join event_history join event_history_details on event.admin_id ="+id+" and event.event_id = event_history.event_id and event_history.event_history_id = event_history_details.event_history_details_id and event_history_details.is_approved = 0;";
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            console.log(result)
            res.send(result)
            res.end()
        }
    })
}