import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Grandlog from '../images/grandlogo.png'


const NavbarShelf = () => {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between">       
                <img src={Grandlog} className='ms-md-5' alt='logo' height="40px" width="60px"/>
                <Navbar.Brand className='me-md-5' href="#home">
                    SHELF LABEL PRINT
                </Navbar.Brand>              
        </Navbar>
    </div>
  )
}

export default NavbarShelf