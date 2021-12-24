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
const eventRegAttempt = require("./models/events/getEventRegAttempt")
const createEventByAdmin = require("./models/events/createEvent.js")
const updateEventByAdmin = require("./models/events/updateEvent.js")
const updateProfile =  require("./models/profile/updateProfile.js")
const eventsOfVolunteer = require("./models/events/getEventsOfVolunteer.js")
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
app.get("/event/regattempt/:id",eventRegAttempt.getEventRegAttempt)
app.post("/event/create",createEventByAdmin.createEvent)
app.post("/event/update",updateEventByAdmin.updateEvent)
app.post("/update/profile",updateProfile.updateProfile)
app.post("/events/volunteer/get",eventsOfVolunteer.getEventsOfVolunteer)