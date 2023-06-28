import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/mynavbar/MyNavBar";
import Homepage from "./components/homepage/Homepage";
import Booking from "./components/booking/Booking";
import Cancelling from "./components/cancelling/Cancelling";
import Contact from "./components/contact/Contact";
import Login from "./components/user/Login";
import Registration from "./components/user/Registration";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Homepage />;
      break;
    case "/book":
      component = <Booking />;
      break;
    case "/cancel":
      component = <Cancelling />;
      break;
    case "/contact":
      component = <Contact />;
      break;
  }

  return (
    <>
      <MyNavBar />
      {/*component*/}
      <Login />
    </>
  );
}

export default App;
