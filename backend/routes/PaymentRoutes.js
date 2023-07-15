const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const Appointment = require("../models/AppointmentsModel");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const data = req.body;
  const apptDate = data.date;
  const apptTime = data.time;
  const token = data.token;
  const name = data.name;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "sgd",
          product_data: {
            name: `Appointment on ${apptDate} at ${apptTime} for ${name}`,
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: `http://localhost:3000/payment/cancel`,
    metadata: {
      token: `${token}`,
    }, //store the token in the session's metadata
  });

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

module.exports = router;
