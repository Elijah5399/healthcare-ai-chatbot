import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SGHLogo from "../../images/SGH-logo.png";
import "../../styles/MyNavBar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthenticationContext } from "../../hooks/useAuthenticationContext";

function MyNavBar() {
  const [user, setUser] = useState("");
  const logout = useLogOut();
  const { globalState } = useAuthenticationContext();

  //on clicking logout button, remove name and token from local storage and remove user
  function handleLogout() {
    logout();
    setUser("");
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
    <Navbar expand="lg" className="bg-body-tertiary" style={{ width: "100vw" }}>
      <Container className="container">
        <Navbar.Brand as="a" href="/">
          <img className="sghlogo" src={SGHLogo} alt="SGH" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/chatbot"
              className="options"
              style={{ width: "200px" }}
            >
              Talk to Us!
            </Nav.Link>
            <Nav.Link
              href="/book"
              className="options"
              style={{ width: "300px" }}
            >
              Book an Appointment
            </Nav.Link>
            <Nav.Link
              href="/cancel"
              className="options"
              style={{ width: "320px" }}
            >
              Cancel an Appointment
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="options"
              style={{ width: "250px" }}
            >
              Contact Us
            </Nav.Link>
          </Nav>
          {user ? (
            <Navbar.Text className="options">
              {user}
              <button className="logoutIconWrapper" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size="lg"
                  className="logoutIcon"
                />
              </button>
            </Navbar.Text>
          ) : (
            <Nav.Link href="/login" className="options">
              Login
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
