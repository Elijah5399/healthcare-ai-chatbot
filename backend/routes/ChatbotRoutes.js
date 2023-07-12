const express = require("express");
const router = express.Router();
const { NlpManager } = require("node-nlp");

router.get("/query", async (req, res) => {
  console.log("question asked");
  const userInput = req.query.input;
  const reply = await ask(userInput);
  res.send(reply);
});

const manager = new NlpManager({ languages: ["en"], forceNER: true });

manager.load(
  "/Users/elijahchia/Documents/SummerTechFest/healthcare-ai-chatbot/backend/routes/model.nlp"
);

// Adds the utterances and intents for the NLP
/*
manager.addDocument("en", "goodbye for now", "greetings.bye");
manager.addDocument("en", "bye bye take care", "greetings.bye");
manager.addDocument("en", "okay see you later", "greetings.bye");
manager.addDocument("en", "bye for now", "greetings.bye");
manager.addDocument("en", "i must go", "greetings.bye");
manager.addDocument("en", "hello", "greetings.hello");
manager.addDocument("en", "hi", "greetings.hello");
manager.addDocument("en", "howdy", "greetings.hello");
*/
// Train also the NLG
/*
manager.addAnswer("en", "greetings.bye", "Till next time");
manager.addAnswer("en", "greetings.bye", "see you soon!");
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Greetings!");
*/
// Train and save the model.
async function ask(qn) {
  //await manager.train();
  //manager.save();
  const response = await manager.process("en", qn);
  console.log(response);
  return response;
}

ask("hi");

module.exports = router;
