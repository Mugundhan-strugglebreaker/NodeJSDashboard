exports.getEventsOfAdmin = (req,res)=>{
    console.log(req.body)
    let id = req.body.id
    let sql= "SELECT event.*,event_type.event_type_name from event JOIN event_type ON event.event_type_id = event_type.event_type_id AND event.admin_id = "+id;
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let i = 1
            result = result.map(item=>{
                return (
                    {
                        ...item,
                        "id":i++,
                        "status": item.is_complete ? 'Completed':'Upcoming' 
                    }
                )
            })
            res.send(result)
            res.end()
        }
    })
}