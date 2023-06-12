import '../../styles/Homepage.css';
import MyNavBar from "../mynavbar/MyNavBar";
import ChatbotLogo from '../.././chatbot-logo.png';

export default function Homepage() {
  return (
    <>
      <MyNavBar />
      <div className="homepageWrapper">
        <h1>Ask Me Anything!</h1>

        <body>
          {/* Main Container */}
          <div className="homepageContainer">
          
          {/* Message Header Section */}
            <div className="msg-header">
              <div class="container1">
                <img src={ChatbotLogo} class="msgimg"/>
                <div class="active">
                  <p>ChatBot @ SGH</p>
                </div>
              </div>
            </div>

          {/* Chat Inbox Section */}
          <div className="chat-page"> 
            <div className="msg-inbox">
              <div className="chats">
                <div className="msg-page">
          {/* Contains Incoming & Outgoing Messages */}   
                </div>
              </div>
            
          {/* Message Bottom Section */}
              <div className="msg-bottom">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Write message..." />
                    <div class="input-group-append ">
                      <span class="input-group-text send-icon "><i class="bi bi-send "></i></span>
                    </div>
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
