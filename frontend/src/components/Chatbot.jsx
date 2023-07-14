import ChatbotLogo from "../images/chatbot-logo.png";
import { useState } from "react";
import userIcon from "../images/profileIcon2.jpeg";

export default function Chatbot() {
  {
    /* Main Container */
  }
  /* messages is an array of JSON objects. */
  const [messages, setMessages] = useState([
    { status: "received", content: "Hello Elijah" },
    { status: "sent", content: "Hello World!" },
  ]);

  const [input, setInput] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("input is: " + input);
      //add a new outgoing message to the chatbox
      setMessages((prevMessages) => [
        ...prevMessages,
        { status: "sent", content: input },
      ]);
      //console.log("input is: " + input);
      setInput("");
      var reply = await fetch(
        `/bot/query?${new URLSearchParams({
          input: input,
        })}`
      );
      var json = await reply.json();
      var answer = json.answer;
      if (!answer) {
        answer = "I didn't understand that. Could you rephrase?";
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { status: "received", content: answer },
      ]);

      //console.log("reply is: " + json.answer);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  var shownMessages;
  return (
    <div className="chatbotContainer">
      {/* Message Header Section */}
      <div className="msg-header">
        <div className="container1">
          <img src={ChatbotLogo} className="msgimg" />
          <div className="active">
            <p className="chatbotText">ChatBot @ SGH</p>
          </div>
        </div>
      </div>
      {/* Chat Inbox Section */}
      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-page">
              {/* Contains Incoming & Outgoing Messages */}
              {messages.map((message, index) => {
                return message.status === "received" ? (
                  <div className="received-chats" key={index}>
                    <img className="received-chats-img" src={ChatbotLogo} />
                    <div className="received-msg">
                      <div className="received-msg-inbox">
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="outgoing-chats" key={index}>
                    <div className="outgoing-msg">
                      <div className="outgoing-chats-msg">
                        <p>{message.content}</p>
                      </div>
                    </div>
                    <img className="outgoing-chats-img" src={userIcon} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Bottom Section */}
          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ask Me Anything!"
                value={input}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                id="sentence"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
