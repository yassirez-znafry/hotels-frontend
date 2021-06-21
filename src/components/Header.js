import PropTypes from 'prop-types'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import {getCurrentUserInfos} from '../Api'



const Header = () => {



const [username, setUsername] = useState("");
const [userInfos, setUserInfos] = useState({});
const [showDashboard, setShowDashboard] = useState(false);


useEffect(() => {
    setUsername(localStorage.getItem("username"))
    if(!localStorage.getItem("userInfos")){
      getCurrentUserInfos()
            .then((res) => {
              localStorage.setItem("userInfos", JSON.stringify(res.data))
              setUserInfos(res.data);
              if(res.data.accessLevel >= 1) setShowDashboard(true);
              console.log("------------------ OK -------------"+localStorage.getItem("userInfos"))
            })
            .catch((err) => console.log(err))
    }else{
      let jsonUserInfos = JSON.parse(localStorage.getItem("userInfos"))
      setUserInfos(jsonUserInfos);
      if(jsonUserInfos.accessLevel >= 1) setShowDashboard(true);
      console.log("------------------ OK --   -----------"+localStorage.getItem("userInfos"))
    }
  }, []);



 function logoutHandler() {
   localStorage.removeItem("username")
   localStorage.removeItem("token")
   localStorage.removeItem("userInfos")
   window.location = "/"
} 
    return (
        <div>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                      <LinkContainer to='/'>
                            <Navbar.Brand><i class="fas fa-hotel"></i> HOTEL MANAGER <i class="fas fa-hotel"></i>
                            </Navbar.Brand>
                      </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                {showDashboard ? (
                  <LinkContainer to='/dashboard'>
        <Nav.Link>Dashboard <i className="fas fa-user"></i></Nav.Link>
        </LinkContainer>
                ):( "" )}
        
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