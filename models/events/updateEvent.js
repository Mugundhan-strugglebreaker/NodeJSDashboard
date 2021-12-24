const db = require("../../DbConnect/DbConnect");

exports.updateEvent= (req,res)=>{
    console.log(req.body)
    let event_type_name = req.body.event_type_name
    let updateEventData = req.body
    let sqlForEventTypeID = "SELECT event_type_id from event_type WHERE LOWER(event_type_name) LIKE LOWER('"+event_type_name+"')";
    db.query(sqlForEventTypeID, async (err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let event_type_id 
            if(result.length==0){
                const data=await createType(event_type_name)
                event_type_id = data.results.insertId
            }else{
                event_type_id = result[0].event_type_id
            }
            delete updateEventData.event_type_name
            delete updateEventData.id
            delete updateEventData.status
            updateEventData = {...updateEventData,'event_type_id':event_type_id}
            let sqlForUpdateEvent = `Update event set ? where event_id=${updateEventData.event_id}`
            db.query(sqlForUpdateEvent,updateEventData,(error,finalResult)=>{
                if(error){
                    res.send(error)
                    res.end()
                }else{
                    res.send(finalResult)
                    res.end()
                }
            })
        }
    })
}
async function createType(event_type_name){
    let sql = "Insert into event_type(event_type_name) values('"+event_type_name+"')"
    const data=await doQuery(sql)
    return data
}
function doQuery(sql) {
    return new Promise (function( resolve, reject ) {
       db.query(sql, function (error, results, fields) {
           if (error) return reject(error)
           resolve({results, fields})
       }) 
    })
}