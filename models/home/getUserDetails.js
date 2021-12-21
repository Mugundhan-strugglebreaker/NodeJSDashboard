exports.getUserDetails =(req,res)=>{
        let id = req.params.id
        let sql = "SELECT * from employee where emp_id="+id;
        db.query(sql,(err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send(result[0])
            }
            res.end()
        })
}