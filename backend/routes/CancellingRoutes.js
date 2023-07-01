const express = require("express")
const Appointment = require("../models/AppointmentsModel")
const mongoose = require("mongoose")

const router = express.Router()

/* Handling a GET request (for UI) */
router.get("/", async (request, response) => {
    const appts = await Appointment.find({}).sort({createdAt: -1})

    response.status(200).json(appts)
})

/* Handling a DELETE request */
router.delete("/:id", async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({error: "No such appointment"})
    }

    const appt = await Appointment.findOneAndDelete({_id: id})

    if (!appt) {
        return response.status(400).json({error: "No such appointment"})
    }

    response.status(200).json(appt)
})

module.exports = router