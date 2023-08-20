import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Grandlog from '../images/grandlogo.png'


const NavbarShelf = () => {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <img src={Grandlog} alt='logo' height="40px" width="60px"/>
                <Navbar.Brand href="#home">
                    Shelf Lable Print
                    </Navbar.Brand>              
            </Container>
        </Navbar>
    </div>
  )
}

export default NavbarShelf