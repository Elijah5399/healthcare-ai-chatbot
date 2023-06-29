const express = require("express")
const Appointment = require("../models/AppointmentsModel")

const router = express.Router()

/* Handling a GET request (for UI) */
router.get("/", async (request, response) => {
    const appts = await Appointment.find({}).sort({createdAt: -1})

    response.status(200).json(appts)
})

/* Handling a DELETE request */
router.get("/:id", (request, response) => {
    response.json({msg: "delete single user appts"})
})

module.exports = router