const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const db = require('./DbConnect/DbConnect.js')
global.db = db;
const userDetails = require("./models/home/getUserDetails")
const eventDetails = require("./models/home/getEventsActive")
const featuredInfo = require("./models/home/getFeaturedInfo")
const chartInfo = require("./models/home/getChartInfo")
const eventsOfAdmin = require("./models/events/getEventsOfAdmin")
app.use(express.json())
app.use(cors())
app.listen(9000,(err)=>{
    if(err){
        console.log("Error in Port");
    }else{
        console.log("Port:9000 Conneted Successfully");
    }
})
app.get("/employee/:id",userDetails.getUserDetails)
app.get("/events/active",eventDetails.getEventActive)
app.post("/featuresinfo/get",featuredInfo.getFeaturedInfo)
app.post("/chartinfo/get",chartInfo.getChartInfo)
app.post("/events/admin/get",eventsOfAdmin.getEventsOfAdmin)
