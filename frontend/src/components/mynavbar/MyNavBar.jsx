import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SGHLogo from "../.././SGH-logo.png";
import "../../styles/MyNavBar.css";

function MyNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ width: "100vw" }}>
      {/*
      <a href="/">
        <img className="sghlogo" src={SGHLogo} />
  </a> */}
      <Container className="container">
        <Navbar.Brand as="a" href="/">
          <img className="sghlogo" src={SGHLogo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
          <Nav.Link href="/login" className="options">
            Login
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
