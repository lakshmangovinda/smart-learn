import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { HomePageTitle, NavBarWrapper } from "./styledNav";

export const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <NavBarWrapper>
    <Navbar bg="primary" expand="lg" variant="dark">
      <HomePageTitle><a  onClick={() => navigate("/home")}>Smart Learning</a></HomePageTitle>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Front-end</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Backend
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Full-Stack</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Support
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
    </NavBarWrapper>
  );
}

export default NavigationBar;
