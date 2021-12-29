const db = require("../../DbConnect/DbConnect");

exports.changeEventStatus = (req,res)=>{
    let sql = "Select * from event where is_complete=false";
    db.query(sql, async(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            let resultFromDb = await Example(result)
            res.send(resultFromDb)
            res.end()
        }
    })
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
    let newData = []
    let j=0
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy+ '-' + mm + '-' + dd;
     for (let i=0;i<data.length;i++) {
        let status = (new Date(data[i].date) - new Date()) >= 0
        if(!status){
            status = (data[i].date === today)
        }
        // console.log(i+" "+status+" "+data[i].event_id+ " "+(data[i].date - today)+" "+data[i].date+"-->"+today+" "+(data[i].date===today))
        if(!status){
            let queryOutput = await doQuery ("Update  event set is_complete=1 where event_id="+data[i].event_id)
        }
     }
     return newData
}