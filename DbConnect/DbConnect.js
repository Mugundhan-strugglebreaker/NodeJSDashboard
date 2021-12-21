const mysql = require('mysql')
//Connecting Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "event_manager"
})
db.connect((err) =>{
    if(err){
        console.log("Error in Connecting Database");
    }else{
    console.log('Connected Successfully');
    }
})

module.exports = db