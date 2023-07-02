const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const Appointment = require("../models/AppointmentsModel");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const data = req.body;
  const apptDate = data.date;
  const apptTime = data.time;
  console.log("Date of appt is:" + apptDate);
  console.log("Time of appt is:" + apptTime);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "sgd",
          product_data: {
            name: `Appointment on ${apptDate} at ${apptTime}`,
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: `http://localhost:3000/payment/cancel`,
  });

  //res.redirect(303, session.url);
  res.json({ url: session.url });
});

//This function handles order fulfilment. lineItems is a JSON obj with the following structure:
/*
{
  object: 'list',
  data: [
    {
      id: 'blablabla',
      object: 'item',
      amount_discount: 0,
      amount_subtotal: 100,
      amount_tax: 0,
      amount_total: 100,
      currency: 'sgd',
      description: 'Appointment',
      price: [Object],
      quantity: 1
    }
  ],
  has_more: false,
  url: '/v1/checkout/sessions/cs_test_a1rBLABLABLA/line_items'
}
*/

//TODO: Attach the appointment to the specified user
const fulfillOrder = (lineItems) => {
  const data = lineItems.data;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("name");
  const epochValue = Date.now();
  for (var i = 0; i < data.length; i++) {
    //iterate through every item they purchased and add them to the database
    try {
      const appt = Appointment.create({ epochValue });
    } catch (err) {
      console.error(err);
    }
  }
  console.log("Fulfilling order", lineItems);
};

//this is a webhook. Whenever a user successfully makes payment, stripe sends a post req to this webhook and
//is received by us

//NOTE: The req is sent to localhost:3001/payment/webhook

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
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
    //console.log("Got payload: " + payload);
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

      // Fulfill the purchase...
      fulfillOrder(lineItems);
    }
    res.status(200).end();
  }
);

module.exports = router;
