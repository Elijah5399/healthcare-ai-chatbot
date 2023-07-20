import "../../styles/Chatbot.css";
import ChatbotLogo from "../../images/chatbot-logo.png";
import { useState } from "react";
import userIcon from "../../images/profileIcon2.jpeg";
import { useAuthenticationContext } from "../../hooks/useAuthenticationContext";

export default function Chatbot() {
  {
    /* Main Container */
  }
  /* messages is an array of JSON objects. */
  const [messages, setMessages] = useState([
    { status: "received", content: "Hello! How can I help you?" },
    { status: "sent", content: "Hello!" },
  ]);

  const [input, setInput] = useState("");
  const { globalState } = useAuthenticationContext();
  const name = localStorage.name;
  const token = localStorage.token;

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("input is: " + input);
      //add a new outgoing message to the chatbox
      setMessages((prevMessages) => [
        ...prevMessages,
        { status: "sent", content: input },
      ]);

      setInput("");
      // var reply = await fetch(
      //   `/bot/query?${new URLSearchParams({
      //     input: input,
      //   })}`
      // );
      var reply = await fetch("/bot/query", {
        method: "POST",
        body: JSON.stringify({ input, token, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      var json = await reply.json();
      var intent = json.reply.intent;
      var answer = json.reply.answer;
      if (!answer) {
        answer = "I didn't understand that. Could you rephrase?";
      } else if (intent === "booking" || intent === "cancelling") {
        if (!globalState) {
          answer =
            "Please login first by clicking on the login button on the top right hand corner of the page";
        }
      } else if (intent === "date") {
        if (!globalState) {
          answer =
            "Please login first by clicking on the login button on the top right hand corner of the page";
        } else {
          if (!json.invalid) {
            console.log(json.responseData.url);
            window.location.href = json.responseData.url;
          }
        }
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { status: "received", content: answer },
      ]);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  var shownMessages;

  return (
    <div className="chatbotContainer">
      <div className="header">
        <h1>Talk to SGH's ChatBot!</h1>
        <h3>Ask me anything! </h3>
        <h3>
          I can help you navigate this webpage and assist you in making bookings
          and cancellations!
        </h3>
      </div>

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
