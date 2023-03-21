import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";

function NavBar() {
  let navigate = useNavigate();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate("/courses")}>Courses</Nav.Link>
            {sessionStorage.getItem("token") == null ? (
              <Nav.Link onClick={() => navigate("/login")}>Signin</Nav.Link>
            ) : null}
            {sessionStorage.getItem("token") == null ? (
              <Nav.Link onClick={() => navigate("/register")}>SignUp</Nav.Link>
            ) : null}
            {sessionStorage.getItem("token") != null ? (
              <Nav.Link
                onClick={() => {
                  sessionStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
