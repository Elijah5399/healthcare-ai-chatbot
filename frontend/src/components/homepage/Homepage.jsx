import "../../styles/Homepage.css";
import Banner from "./Banner";
import Vivian from "../../images/Vivian.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className="homepageWrapper">
        <div className="homepageContainer">
          <div className="homepageIntro">
            <div className="introHeader">
              <h1>
                Patients. At the <span className="heart">Heart</span> of All We
                Do.
              </h1>
            </div>
            <div className="introPara">
              <h4>
                Defining Tomorrow's Medicine through{" "}
                <span className="compassion">Compassion</span>,{" "}
                <span className="integrity">Integrity</span> and{" "}
                <span className="collaboration">Collaboration</span>.
              </h4>
              <h4>
                Here at SGH, we Care to Heal, Educate to Empower and Innovate to
                Advance.
              </h4>
            </div>
            <div className="buttons">
              <Link to="/chatbot">
                <button class="chatbotLink">
                  {" "}
                  Talk to SGH's 24h Chatbot!{" "}
                </button>
              </Link>
            </div>
          </div>

          <img className="vivian" src={Vivian} />
          {/* <Banner /> */}
        </div>
      </div>
    </>
  );
}
