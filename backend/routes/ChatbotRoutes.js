const express = require("express");
const router = express.Router();
const { NlpManager } = require("node-nlp");
const axios = require("axios");

// router.get("/query", async (req, res) => {
//   const userInput = req.query.input;
//   const name = req.body.name;
//   const token = req.body.token;
//   console.log(name + token)
//   const reply = await ask(userInput);

//   if (reply.entities[5].entity === 'datetime') {
//     const dateTimeArray = reply.entities[5].utteranceText.split(" ");
//     const date = dateTimeArray[0];
//     const time = dateTimeArray[1];

//     console.log(date)
//     console.log(time)

//     console.log(reply.entities[5].utteranceText);
//   }

//   res.send(reply);
// });

router.post("/query", async (req, res) => {
  const userInput = req.body.input;
  const name = req.body.name;
  const token = req.body.token;
  const reply = await ask(userInput);

  const combinedData = {
    reply: reply,
    responseData: null,
    invalid: false,
  };

  if (reply.intent === "date") {
    const dateTimeArray = userInput.split(" ");
    const date = dateTimeArray[0];
    const time = dateTimeArray[1];

    const dateTimeString = `${date} ${time}`;
    const epochValue = new Date(dateTimeString).getTime();

    const currTemp = new Date();
    const currDate = currTemp.getTime();
    const minDiff = 86400000;

    if (epochValue - currDate < minDiff) {
      combinedData.reply.answer = "Please ensure that your booking is at least 24h past the current time and the date provided is not in the past.";
      combinedData.invalid = true;
    }

    const response = await axios.post(
      "http://localhost:3000/payment/create-checkout-session",
      { date, time, token, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    combinedData.responseData = response.data;

    res.send(combinedData);
  } else {
    res.send(combinedData);
  }
});

const manager = new NlpManager({ languages: ["en"], forceNER: true });

manager.load("./routes/model.nlp");

/*

// Greetings
manager.addDocument("en", "hi", "greetings.hello");
manager.addDocument("en", "hello", "greetings.hello");
manager.addDocument("en", "good morning", "greetings.hello");
manager.addDocument("en", "bye", "greetings.bye");
manager.addDocument("en", "goodbye", "greetings.bye");

// Bookings
manager.addDocument("en", "i would like to make a booking", "booking");
manager.addDocument("en", "how can i make a booking?", "booking");
manager.addDocument("en", "book an appointment", "booking");
manager.addDocument("en", "i want an appointment", "booking");
manager.addDocument("en", "book for me", "booking.request");
manager.addDocument("en", "help me book", "booking.request");
manager.addDocument("en", "i would like you to book for me", "booking.request");
manager.addDocument("en", "second option", "booking.request");
manager.addDocument("en", "do it for me", "booking.request");
manager.addDocument("en", "i want the second option", "booking.request");
manager.addDocument("en", "i want the second one", "booking.request");

// Cancellation
manager.addDocument("en", "i would like to cancel an appointment", "cancelling");
manager.addDocument("en", "how can i cancel an appointment?", "cancelling");
manager.addDocument("en", "cancel an appointment", "cancelling");

// Contact
manager.addDocument("en", "where are you located?", "contact.location");
manager.addDocument("en", "location", "contact.location");
manager.addDocument("en", "what is your contact number?", "contact.number");
manager.addDocument("en", "is there a contact number i can contact?", "contact.number");
manager.addDocument("en", "what time are you open", "contact.open");
manager.addDocument("en", "what are your opening hours?", "contact.open");
manager.addDocument("en", "when can i visit?", "contact.open");
manager.addDocument("en", "what are your visiting hours?", "contact.open");

// Feedback
manager.addDocument("en", "i would like to provide feedback", "feedback");
manager.addDocument("en", "give feedback", "feedback");
manager.addDocument("en", "improvements", "feedback");
manager.addDocument("en", "feedback", "feedback");
manager.addDocument("en", "your website can be improved", "feedback");
manager.addDocument("en", "the hospital queues are too long", "feedback");
manager.addDocument("en", "the bookings and cancellations can be made easier", "feedback");
manager.addDocument("en", "the chatbot can be more responsive", "feedback");

// Date
manager.addDocument("en", "2023-1-1 01:00", "date");
manager.addDocument("en", "2023-2-26 02:00", "date");
manager.addDocument("en", "2023-3-10 03:30", "date");
manager.addDocument("en", "2023-3-31 10:00", "date");
manager.addDocument("en", "2023-4-27 14:43", "date");
manager.addDocument("en", "2023-5-2 21:43", "date");
manager.addDocument("en", "2024-6-12 03:39", "date");
manager.addDocument("en", "2024-1-1 01:00", "date");
manager.addDocument("en", "2024-2-26 02:00", "date");
manager.addDocument("en", "2025-3-10 03:30", "date");
manager.addDocument("en", "2025-3-31 10:00", "date");
manager.addDocument("en", "2025-4-27 14:43", "date");

// Answers
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Greetings!");
manager.addAnswer("en", "greetings.bye", "Goodbye!");
manager.addAnswer("en", "greetings.bye", "See you soon!");

manager.addAnswer("en", "booking", "There are 2 ways to make a booking. First, you can click the Bookings tab to book an appointment! Second, you can send me a date and time and I will do it for you!")
manager.addAnswer("en", "booking.request", "Please respond with your desired appointment in YYYY-MM-DD and HH:MM (24h clock) format. Please note that you will immediately be redirected to the payment page.")

manager.addAnswer("en", "cancelling", "Click the Cancel tab to cancel an appointment!")

manager.addAnswer("en", "contact.location", "We are located at Outram Road, Singapore 169608. You can check out our contact information under the Contacts tab to find out more!")
manager.addAnswer("en", "contact.number", "For general enquiries, please call (+65) 6222 3322 (24h). For feedback, please call (+65) 6326 5350 (Mon to Fri : 9am to 5pm). You can check out our contact information under the Contacts tab to find out more!")
manager.addAnswer("en", "contact.open", "We are open 24h and our visiting times are 12:00pm to 2:00pm and 5:00pm to 8:30pm. You can check out our contact information under the Contacts tab to find out more!")

manager.addAnswer("en", "feedback", "Thank you for your feedback! We will work on it promptly.")

manager.addAnswer("en", "date", "Redirecting to payment page.")

// Train and save the model.
manager.train()
manager.save()

*/

async function ask(qn) {
  const response = await manager.process("en", qn);
  return response;
}

module.exports = router;
