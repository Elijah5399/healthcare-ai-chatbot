const express = require("express");
const Appointment = require("../models/AppointmentsModel");

const router = express.Router();

/* Handling a POST request */
router.post("/submit", async (request, response) => {
  // request to access data being sent
  const { id, dateTime } = request.body;

  try {
    const appt = await Appointment.create({ id, dateTime });
    response.status(200).json(appt);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }

  response.json({ msg: "get single user appts" });
});

module.exports = router;
