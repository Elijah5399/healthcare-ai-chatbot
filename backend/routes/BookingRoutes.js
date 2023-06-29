const express = require("express")
const Appointment = require("../models/AppointmentsModel")

const router = express.Router()

/* Handling a POST request */
router.post("/submit", async (request, response) => { // request to access data being sent   
    const {epochValue} = request.body
    
    try {
        const appt = await Appointment.create({epochValue})
        response.status(200).json(appt)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})

module.exports = router