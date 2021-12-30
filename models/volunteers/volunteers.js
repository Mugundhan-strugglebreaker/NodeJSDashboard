const db = require("../../DbConnect/DbConnect");

exports.volunteers = (req,res)=>{
    let sql= "select employee.emp_id, employee.emp_name,employee.phone_number,employee.dept, employee.email, login.role from employee join login on employee.emp_id = login.id and login.role = 'V';";
    db.query(sql,async (err,result)=>{
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
                    }
                )
            })
            let final_res = await example(result)            
            console.log('outside')
            res.send(final_res)
            res.end()
        }
    })


    function doquery(sql_1)  {
        return new Promise (function(resolve,reject){
            db.query(sql_1,function (err,results,fields){
                if (err){
                    return reject(error)
                }
               
                resolve({results,fields})
            })


        })
    }


    async function example(result){
        let final_res = []
        let temp = [0]
            for (let j = 0; j< result.length;j++){                
                let sql_1 = "SELECT IFNULL(sum(event_history_details.credits_gained),0) AS credits from event_history_details JOIN event_history on event_history.event_history_id = event_history_details.event_history_details_id and event_history.emp_id=" +result[j].emp_id;
                let op = await doquery(sql_1)
                final_res[j] = { ...op.results[0], ...result[j]}
                // console.log(op)                                 
                
            }  
                     
            return final_res


    }
}