import "../../styles/Homepage.css";
import MyNavBar from "../mynavbar/MyNavBar";
import Chatbot from "../Chatbot";

export default function Homepage() {
  return (
    <>
      <MyNavBar />
      <div className="homepageWrapper">
        <div className="homepageText">
          <h1>Talk to SGH's ChatBot!</h1>
        </div>

        <body>
          <Chatbot />
        </body>
      </div>
    </>
  );
}
