const express = require("express");
const router = express.Router();
const { NlpManager } = require("node-nlp");

router.get("/query", async (req, res) => {
  const userInput = req.query.input;
  const reply = await ask(userInput);
  res.send(reply);
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
manager.addDocument("en", "where are you located?", "contact");
manager.addDocument("en", "location", "contact");
manager.addDocument("en", "what is your contact number?", "contact");
manager.addDocument("en", "is there a contact number i can contact?", "contact");
manager.addDocument("en", "what time are you open", "contact");
manager.addDocument("en", "what are your opening hours?", "contact");

// Answers
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Greetings!");
manager.addAnswer("en", "greetings.bye", "Goodbye!");
manager.addAnswer("en", "greetings.bye", "See you soon!");

manager.addAnswer("en", "booking", "Please login if you are not logged in yet. Then, proceed to click the Bookings tab to book an appointment!")

manager.addAnswer("en", "cancelling", "Please login if you are not logged in yet. Then, proceed to click the Cancel tab to cancel an appointment!")

manager.addAnswer("en", "contact", "Check out our contact information under the Contacts tab!")

// Train and save the model.
manager.train()
manager.save()

*/

async function ask(qn) {
  const response = await manager.process("en", qn);
  console.log(response);
  return response;
}

module.exports = router;
