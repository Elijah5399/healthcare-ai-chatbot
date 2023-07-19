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
  };

  if (reply.intent === "date") {
    const dateTimeArray = userInput.split(" ");
    const date = dateTimeArray[0];
    const time = dateTimeArray[1];

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

// Date
manager.addDocument("en", "2023-1-1 14:43", "date");
manager.addDocument("en", "2024-6-12 03:39", "date");

// Answers
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Greetings!");
manager.addAnswer("en", "greetings.bye", "Goodbye!");
manager.addAnswer("en", "greetings.bye", "See you soon!");

manager.addAnswer("en", "booking", "There are 2 ways to make a booking. First, you can click the Bookings tab to book an appointment! Second, you can send me a date and time and I will do it for you! Please send it to me in YYYY-MM-DD and HH:MM (24h clock) format.")

manager.addAnswer("en", "cancelling", "Click the Cancel tab to cancel an appointment!")

manager.addAnswer("en", "contact.location", "We are located at Outram Road, Singapore 169608. You can check out our contact information under the Contacts tab to find out more!")
manager.addAnswer("en", "contact.number", "For general enquiries, please call (+65) 6222 3322 (24h). For feedback, please call (+65) 6326 5350 (Mon to Fri : 9am to 5pm). You can check out our contact information under the Contacts tab to find out more!")
manager.addAnswer("en", "contact.open", "We are open 24h and our visiting times are 12:00pm to 2:00pm and 5:00pm to 8:30pm. You can check out our contact information under the Contacts tab to find out more!")

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
