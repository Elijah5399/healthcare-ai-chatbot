const express = require("express");
const mongoose = require("mongoose");
const executeQueries = require("./dialogflow");
require("dotenv").config();
const User = require("./models/UsersModel");
const Appointment = require("./models/AppointmentsModel");

/* Creating Express App */
const expressApp = express();

/* Importing appointmentRoutes */
const bookingRoutes = require("./routes/BookingRoutes") // to be able to use them in expressApp
const cancellingRoutes = require("./routes/CancellingRoutes")
const userRoutes = require("./routes/UserRoutes")

/* Middleware */
expressApp.use(express.json()); // used to parse JSON data in incoming requests
expressApp.use(express.static("../frontend/index.js")); // help me elijah! im not very sure what this does! oh no!
expressApp.use(express.urlencoded({ extended: true })) // used to parse URL-encoded data submitted through HTML forms

/* Using bookingRoutes in expressApp */
expressApp.use("/book", bookingRoutes) // this route will only be used when url has "/book"
expressApp.use("/cancel", cancellingRoutes)
expressApp.use("/user", userRoutes)

/* Connecting to DB */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to database first
        .then(() => expressApp.listen(3001, () => { // begin listening for requests second
          console.log("connected to db and listening on port 3001")}))
        .catch((error) => console.log(error))


/* Reacting to Requests */
expressApp.get("/", (request, response) => { // when user goes to route "/" --> it fires a response to send back frontend (home page)
  response.json({mssg: "welcome!"})
  // response.sendFile("../../frontend/src/index.js", { root: __dirname })
});

expressApp.get("/book/submit", async (request, response) => {
  const {id, dateTime} = request.body
    
  try {
      const appt = await apptModel.create({id, dateTime})
      response.status(200).json(appt)
  } catch (error) {
      response.status(400).json({error: error.message})
  }
})

// expressApp.get("/add-appt", (request, response) => {
//   const appt = new Appointment({
//     id: "1",
//     date: "2023-06-26T14:30:00"  
//   })

//   appt.save()
//       .then((result) => response.send(result))
//       .catch((error) => console.log(error))
// });

expressApp.get("/askQn", (req, res) => {
  executeQueries(
    process.env.PROJECT_ID,
    123456,
    ["what time are you open?"],
    "en"
  ).then((ans) => res.send(ans));
});

/* Start */
const usersRoutes = require("./routes/BookingRoutes"); // obtaining the route
expressApp.use("/api/users", usersRoutes); // using the route only when the url consists of /api/users
