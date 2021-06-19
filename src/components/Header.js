import PropTypes from 'prop-types'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'



const Header = () => {



const [username, setUsername] = useState("");


useEffect(() => {
    setUsername(localStorage.getItem("username"))
  }, []);



 function logoutHandler() {
   localStorage.removeItem("username")
   localStorage.removeItem("token")
   window.location = "/"
} 
    return (
        <div>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                      <LinkContainer to='/'>
                            <Navbar.Brand><i class="fas fa-hotel"></i> HOTELS <i class="fas fa-hotel"></i>
                            </Navbar.Brand>
                      </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
        
        {username ? (
                  <LinkContainer to='/profile'>
        <Nav.Link>profile <i className="fas fa-user"></i></Nav.Link>
        </LinkContainer>
                ):(<LinkContainer to='/register'>
        <Nav.Link>sign up <i className="fas fa-user"></i></Nav.Link>
        </LinkContainer>)}

        {username ? (
                  
                   <LinkContainer to='/' onClick={logoutHandler}>
        <Nav.Link>log out <i className="fas fa-sign-in-alt"></i></Nav.Link>
        </LinkContainer>
                  
                ):(<LinkContainer to='/login'>
        <Nav.Link>log in <i className="fas fa-sign-in-alt"></i></Nav.Link>
        </LinkContainer>)}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
            
        </div>
    )
}


export default Header