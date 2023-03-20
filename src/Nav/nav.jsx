import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function NavBar() {
    
  return (
    <Navbar bg="warning" expand="lg" >
      <Container >
       
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="justify-content-end" style={{width:"100%"}}>

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
            <Nav.Link href="#About Us">About Us</Nav.Link>
            <Nav.Link href="#Features">Features</Nav.Link>
            {localStorage.getItem('token')==null?<NavLink    to="/login">Signin</NavLink>:null}
            {localStorage.getItem('token')==null?<NavLink    to="/register">SignUp</NavLink>:null}
            {localStorage.getItem('token')!=null?<NavLink   onClick={()=>localStorage.removeItem('token')}>Logout</NavLink>:null}
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavBar;