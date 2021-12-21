exports.getEventActive= (req,res)=>{
    let sql= "SELECT event.*,event_type.event_type_name from event JOIN event_type ON event.event_type_id = event_type.event_type_id AND event.is_complete = "+false;
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            res.send(result)
            res.end()
        }
    })
}
