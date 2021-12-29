exports.login = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username+" "+password)
    let sql= `SELECT emp_id,emp_name,dept,email,phone_number,role from login join employee on id=emp_id and username='${username}' and password='${password}'`;
    db.query(sql,(err,result) => {

            if(err){
                res.send({err: err})
                res.end()
            } 
            else if (result.length > 0){
                result = [{...result[0],loginStatus:true}]
                res.send(result)
                res.end()
            } else{
                res.send([{
                    loginStatus : false,
                    errorMessage : "Invalid Username or Password"
                }]);
                res.end()
            }
            
        }
    
    );
}