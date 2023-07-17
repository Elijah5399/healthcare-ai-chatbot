const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const Appointment = require("../models/AppointmentsModel");
const router = express.Router();

const fulfillOrder = (lineItems, token) => {
  console.log("Fulfilling order", lineItems);
  const data = lineItems.data;
  //const epochValue = Date.now();
  for (var i = 0; i < data.length; i++) {
    //iterate through every item they purchased and add them to the database
    const description = data[i].description;
    const parsed = description.split(" ");
    const date = parsed[2];
    const time = parsed[4];
    console.log("token is: " + token);

    try {
      const dateTimeString = `${date} ${time}`;
      const epochValue = new Date(dateTimeString).getTime();
      const response = fetch("http://localhost:3001/book/submit", {
        method: "POST",
        body: JSON.stringify({ epochValue }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
};

//this is a webhook. Whenever a user successfully makes payment, stripe sends a post req to this webhook and
//is received by us

//NOTE: The req is sent to localhost:3001/webhook, must use the stripe CLI to forward the webhook first
//follow this link to get the webhook working
//https://stripe.com/docs/webhooks/test

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("webhook hit");
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      //verify that the payload was actually sent from stripe using stripe's constructEvent method and the webhook secret
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.ENDPOINT_SECRET
      );
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      const token = event.data.object.metadata.token; //retrieve the token stored in the session's metadata

      // Fulfill the purchase...
      fulfillOrder(lineItems, token);
    }
    res.status(200).end();
  }
);

module.exports = router;
