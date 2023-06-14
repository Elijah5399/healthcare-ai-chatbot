const express = require("express");
require("dotenv").config();
const { WebhookClient } = require("dialogflow-fulfillment");

/* Creating Express App */
const expressApp = express();

/* Reacting to Requests */
expressApp.get("/", (req, res) => {
  res.send("Hi from server!");
});

/* Listen for Requests */
expressApp.listen(4000, () => {
  console.log("listening on port 4000");
});
