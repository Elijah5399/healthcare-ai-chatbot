import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
            <Nav.Link href="#home">Book an Appointment</Nav.Link>
            <Nav.Link href="#link">Cancel an Appointment</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
            <Nav.Link href="#link">Locate Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
