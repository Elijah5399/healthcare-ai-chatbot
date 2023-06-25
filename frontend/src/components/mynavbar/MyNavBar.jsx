import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import SGHLogo from '../.././SGH-logo.png';
import "../../styles/MyNavBar.css";

function MyNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="container">
        <img href="/" className="sghlogo" src={SGHLogo} />
        <div className="navbarWrapper">
          <Navbar.Brand href="/" className="navbarHome">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/book" className="options">Book an Appointment</Nav.Link>
              <Nav.Link href="/cancel" className="options">Cancel an Appointment</Nav.Link>
              <Nav.Link href="/contact" className="options">Contact Us</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
