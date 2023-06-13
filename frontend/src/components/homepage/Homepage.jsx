import '../../styles/Homepage.css';
import MyNavBar from "../mynavbar/MyNavBar";
import ChatbotLogo from '../.././chatbot-logo.png';
import userImage from '../.././user-image.png'

export default function Homepage() {
  return (
    <>
      <MyNavBar />
      <div className="homepageWrapper">
        <div className="homepageText">
          <h1>Talk to SGH's ChatBot!</h1>
        </div>

        <body>
          {/* Main Container */}
          <div className="chatbotContainer">
          
          {/* Message Header Section */}
            <div className="msg-header">
              <div class="container1">
                <img src={ChatbotLogo} class="msgimg"/>
                <div class="active">
                  <p class="chatbotText">ChatBot @ SGH</p>
                </div>
              </div>
            </div>
          {/* Chat Inbox Section */}
          <div className="chat-page"> 
            <div className="msg-inbox">
              <div className="chats">
                <div className="msg-page">
          {/* Contains Incoming & Outgoing Messages */}
                  <div class="received-chats">
                    <img class="received-chats-img" src={ChatbotLogo} />
                    <div class="received-msg">
                      <div class="received-msg-inbox">
                        <p>
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="outgoing-chats">
                    <div class="outgoing-msg">
                      <div class="outgoing-chats-msg">
                        <p>
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                          Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah Elijah
                        </p>
                      </div>
                    </div>
                  </div>
          </div>
        </div>
            
          {/* Message Bottom Section */}
              <div className="msg-bottom">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Ask Me Anything!" />
                </div>
              </div>

            </div>
          </div>
        </div>
        </body>

      </div>
    </>
  );
}
