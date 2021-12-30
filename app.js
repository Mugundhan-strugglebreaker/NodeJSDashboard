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
const eventAttemptDetailsForV = require("./models/events/getEventAttemptDetailsForV.js")
const participateEventByV = require("./models/events/eventParticipate.js")
const allEvents = require("./models/events/getAllEvents.js")
const changeEvent = require("./models/events/changeEventStatus.js")
const eventParticpateDetails = require("./models/events/getEventParticipateDetails.js")
const eventRegister = require("./models/events/regForEvent.js")
const makeReaction = require("./models/reactions/makeReaction.js")
const login = require("./models/login/login.js")
const requestList = require("./models/request/getRequestList.js")
const acceptRequest = require("./models/request/acceptRequest.js")
const rejectRequest = require("./models/request/rejectRequest.js")
const notif = require("./models/notification/getNotif.js")
const volunteers= require("./models/volunteers/volunteers.js")

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
app.post("/event/attemptdetails",eventAttemptDetailsForV.getEventAttemptDetailsForV)
app.post("/event/participate",participateEventByV.eventParticipate)
app.get("/allevents",allEvents.getAllEvents)
app.get("/change/event/status",changeEvent.changeEventStatus)
app.post("/event/participatedetails/get",eventParticpateDetails.getEventParticipateDetails)
app.post("/event/register",eventRegister.regForEvent)
app.post("/makereaction",makeReaction.makeReaction)
app.post("/login",login.login)
app.get("/requestlist/get/:id",requestList.getRequestList)
app.post("/request/accept",acceptRequest.acceptRequest)
app.post("/request/reject",rejectRequest.rejectRequest)
app.get("/notif/:id",notif.getNotif)
app.get("/volunteers",volunteers.volunteers)