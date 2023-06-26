const express = require("express");
const mongoose = require("mongoose");
const executeQueries = require("./dialogflow");
require("dotenv").config();
const User = require("./models/UsersModel");
const Appointment = require("./models/AppointmentsModel");

/* Creating Express App */
const expressApp = express();

/* Connecting to DB */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to database first
        .then(() => expressApp.listen(3000, () => { // begin listening for requests second
          console.log("connected to db and listening on port 3000 ")}))
        .catch((error) => console.log(error))

/* Middleware (???) */
expressApp.use(express.json());
expressApp.use(express.static("../frontend/index.js"));

/* Reacting to Requests */
expressApp.get("/", (request, response) => { // when user goes to route "/" --> it fires a response to send back frontend (home page)
  response.sendFile("../../frontend/src/index.js", { root: __dirname })
});

expressApp.get("/add-appt", (request, response) => {
  const appt = new Appointment({
    id: "1",
    date: "2023-06-26T14:30:00"  
  })

  appt.save()
      .then((result) => response.send(result))
      .catch((error) => console.log(error))
});

expressApp.get("/askQn", (req, res) => {
  executeQueries(
    process.env.PROJECT_ID,
    123456,
    ["what time are you open?"],
    "en"
  ).then((ans) => res.send(ans));
});

/* Start */
const usersRoutes = require("./routes/Bookings"); // obtaining the route
expressApp.use("/api/users", usersRoutes); // using the route only when the url consists of /api/users
