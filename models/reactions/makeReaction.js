const db = require("../../DbConnect/DbConnect")

exports.makeReaction =(req,res)=>{
    let reaction_id = req.body.reaction_id
    let emoji = req.body.emoji
    let sql = `Update reaction set ${emoji} = ${emoji} + 1 where reaction_id=${reaction_id}`
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