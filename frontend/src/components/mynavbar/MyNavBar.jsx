import SGHLogo from "../../images/SGH-logo.png";
import "../../styles/MyNavBar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthenticationContext } from "../../hooks/useAuthenticationContext";
import { Link } from "react-router-dom";

function MyNavBar() {
  const [user, setUser] = useState("");
  const logout = useLogOut();
  const { globalState } = useAuthenticationContext();
  const [dropdown, setdropdown] = useState(false);

  //on clicking logout button, remove name and token from local storage and remove user
  function handleLogout() {
    logout();
    setUser("");
  }

  function dropdownhandler() {
    setdropdown(!dropdown);
  }

  useEffect(() => {
    if (localStorage.name && localStorage.token) {
      //console.log("token is: " + localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      fetch("/user/verify", {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          //console.log("res status 200");
          //if the user is successfully validated, set their username
          setUser(localStorage.getItem("name"));
        } else {
          //console.log("res status not 200");
          //do nothing
          //console.log(res.message);
        }
      });
    }
  });

  return (
    <div className="navbarWrapper">
      <nav className="container">
        <div>
          <Link to="/">
            <img className="sghlogo" src={SGHLogo} alt="SGH" />
          </Link>
        </div>
        <ul className="large">
          <li>
            <Link
              to="/chatbot"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Talk to Us!
            </Link>
          </li>
          <li>
            <Link
              to="/book"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Book Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/cancel"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Cancel Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      <div className="loginNavWrapper">
        {user ? (
          <button className="logoutIconWrapperLarge" onClick={handleLogout}>
            <p>{user}</p>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="lg"
              className="logoutIcon"
            />
          </button>
        ) : (
          <button className="loginButton">
            <a href="/login">Login</a>
          </button>
        )}
      </div>

      {/* below code is for smaller screens */}
      <div className="hamburgerIcon">
        <button id="hamburgerbutton" onClick={dropdownhandler}>
          <FontAwesomeIcon icon={faBars} size={"2x"} />
        </button>
      </div>
      <div className={dropdown ? "dropdown" : "dropdown-hidden"}>
        {/* Changes to dropdown when button is clicked */}
        <ul className="small">
          <li>
            <Link
              to="/chatbot"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Talk to Us!
            </Link>
          </li>
          <li>
            <Link
              to="/book"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Book Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/cancel"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Cancel Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "20px",
                paddingRight: "35px",
              }}
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="loginWrapperSmall">
          {user ? (
            <button className="logoutIconWrapperSmall" onClick={handleLogout}>
              <p>{user}</p>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="lg"
                className="logoutIcon"
              />
            </button>
          ) : (
            <button className="loginButtonSmall">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyNavBar;
