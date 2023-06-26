const express = require("express");
require("dotenv").config();
const executeQueries = require("./dialogflow");

/* Creating Express App */
const expressApp = express();

/* Middleware (???) */
expressApp.use(express.json());

expressApp.use(express.static("../frontend/index.js"));
/*
expressApp.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});
*/

/* erlijah */

/* Reacting to Requests */

expressApp.get("/", (request, response) => {
  // request
  response.send("hello");
});

expressApp.get("/askQn", (req, res) => {
  executeQueries(
    process.env.PROJECT_ID,
    123456,
    ["what time are you open?"],
    "en"
  ).then((ans) => res.send(ans));
});

/* Listen for Requests */
expressApp.listen(4000, () => {
  console.log("listening on port 4000");
});

/* Start */
const usersRoutes = require("./routes/Users"); // obtaining the route
expressApp.use("/api/users", usersRoutes); // using the route only when the url consists of /api/users
