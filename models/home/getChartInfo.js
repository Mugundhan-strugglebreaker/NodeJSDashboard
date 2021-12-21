const db = require("../../DbConnect/DbConnect");


exports.getChartInfo = async (req,res)=>{
    console.log(req.body)
    const role = req.body.role
    const id = req.body.id
    console.log(role+" "+id);
    if(role==='A'){
        let sql = "Select event_id,event_name,date,credits from event where admin_id="+id;
        db.query(sql,async (err,result)=>{
            if(err){
                res.send(err)
                res.end()
            }else{
                let data = result
                await Example(data) 
                res.send(data)
                res.end()   
            }
        })
    }else{
        let sql = "SELECT event.event_id,event_name,date,credits,credits_gained from event JOIN event_history on event.event_id = event_history.event_id AND event_history.emp_id ="+id+" JOIN event_history_details on event_history_details.event_history_details_id = event_history.event_history_id"
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
}

function doQuery(sql) {
    return new Promise (function( resolve, reject ) {
       db.query(sql, function (error, results, fields) {
           if (error) return reject(error)
           resolve({results, fields})
       }) 
    })
}

async function Example ( data ) {
     for (let i=0;i<data.length;i++) {
        let queryOutput = await doQuery ("SELECT COUNT(if(!is_attempt,event_history_id,null)) as Registered,COUNT(if(is_attempt,event_history_id,null)) as Attempted from event_history WHERE event_id ="+data[i].event_id)
        let register = queryOutput.results[0].Registered + queryOutput.results[0].Attempted
        let attempt = queryOutput.results[0].Attempted
        data[i]= {...data[i],'noOfRegistered': register , 'noOfAttempted':attempt}
     }
     return data
}