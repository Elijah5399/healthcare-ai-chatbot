const express = require("express");
const Appointment = require("../models/AppointmentsModel");
const requireAuthentication = require("../middleware/requireAuthentication")

const router = express.Router();

// require authentication for all cancelling routes
router.use(requireAuthentication)

/* Handling a POST request */
router.post("/submit", async (request, response) => { // request to access data being sent   
    const {epochValue} = request.body
    
    try {
        const user_id = request.user._id
        const appt = await Appointment.create({epochValue, user_id})
        response.status(200).json(appt)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
})

module.exports = router;