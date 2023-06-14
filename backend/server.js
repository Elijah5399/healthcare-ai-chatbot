const express = require("express");
require("dotenv").config();

/* Creating Express App */
const expressApp = express();

/* Middleware (???) */
expressApp.use(express.json());

expressApp.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

/* Reacting to Requests */
expressApp.get("/", (request, response) => {
  // request
  response.json({ msg: "Welcome to the app" });
});

/* Listen for Requests */
expressApp.listen(4000, () => {
  console.log("listening on port 4000");
});

/* Start */
const usersRoutes = require("./routes/Users"); // obtaining the route
expressApp.use("/api/users", usersRoutes); // using the route only when the url consists of /api/users
