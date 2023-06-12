import "./Homepage.css";
import MyNavBar from "../MyNavBar/MyNavBar";

export default function Homepage() {
  return (
    <>
      <MyNavBar />
      <div className="homepageWrapper">
        <h1>Hello World!</h1>
      </div>
    </>
  );
}
