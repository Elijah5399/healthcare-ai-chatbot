import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SGHLogo from '../.././SGH-logo.png';
import "../../styles/MyNavBar.css";

function MyNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img className="sghlogo" src={SGHLogo} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="options">
              <Nav.Link href="#home" className="options">Book an Appointment</Nav.Link>
              <Nav.Link href="#link" className="options">Cancel an Appointment</Nav.Link>
              <Nav.Link href="#link" className="options">Contact Us</Nav.Link>
              <Nav.Link href="#link" className="options">Locate Us</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
