const express = require("express");
const mongoose = require("mongoose");
const executeQueries = require("./dialogflow");
require("dotenv").config();
const User = require("./models/UsersModel");
const Appointment = require("./models/AppointmentsModel");

/* Creating Express App */
const expressApp = express();

/* Importing appointmentRoutes */
const bookingRoutes = require("./routes/BookingRoutes"); // to be able to use them in expressApp
const cancellingRoutes = require("./routes/CancellingRoutes");
const userRoutes = require("./routes/UserRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const webhookRoutes = require("./routes/Webhook");
const botRoutes = require("./routes/ChatbotRoutes");

/* Webhook route needs to come before app.use(express.json()) */
expressApp.use("/webhook", webhookRoutes);

/* Middleware */
expressApp.use(express.json()); // used to parse JSON data in incoming requests
expressApp.use(express.static("../frontend/index.js")); // help me elijah! im not very sure what this does! oh no!
expressApp.use(express.urlencoded({ extended: true })); // used to parse URL-encoded data submitted through HTML forms

/* Using bookingRoutes in expressApp */
expressApp.use("/book", bookingRoutes); // this route will only be used when url has "/book"
expressApp.use("/cancel", cancellingRoutes);
expressApp.use("/user", userRoutes);
expressApp.use("/payment", paymentRoutes);
expressApp.use("/bot", botRoutes);

/* Connecting to DB */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // connect to database first
  .then(() =>
    expressApp.listen(3001, () => {
      // begin listening for requests second
      console.log("connected to db and listening on port 3001");
    })
  )
  .catch((error) => console.log(error));

/* Elijah's Nonsense */
expressApp.get("/askQn", (req, res) => {
  executeQueries(
    process.env.PROJECT_ID,
    123456,
    ["what time are you open?"],
    "en"
  ).then((ans) => res.send(ans));
});
