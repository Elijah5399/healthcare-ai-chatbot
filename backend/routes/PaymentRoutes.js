const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "sgd",
          product_data: {
            name: "Appointment",
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

  res.redirect(303, session.url);
});

module.exports = router;
