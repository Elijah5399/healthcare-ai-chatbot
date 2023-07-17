import "../../styles/Homepage.css";
import Banner from "./Banner";
import Vivian from "../../images/Vivian.png";

export default function Homepage() {
  return (
    <>
      <div className="homepageWrapper">
        <div className="homepageContainer">
          <div className="homepageIntro">
            
          </div>
          <div className="vivian">
            <img className="" src={Vivian} />
          </div>
          {/* <Banner /> */}
        </div>
      </div>
    </>
  );
}
