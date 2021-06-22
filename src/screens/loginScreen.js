import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login , getCurrentUserInfos} from "../Api";

const LoginScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfos, setUserInfos] = useState({});

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const loginRequest = {
        username:email,
        password,
        image: "imgs/default.svg",
      };

    login(loginRequest)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.authenticationToken)
          localStorage.setItem("token", res.data.authenticationToken)
          localStorage.setItem("username", res.data.username)
          window.location = "/"
        
        })
        .catch((err) => {
          alert("Something went wrong!! Try again using different credentials");
          console.log(err);
        });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginScreen


const sports = [{
    text: "Basketball",
    id: 1
  }, {
    text: "Football",
    id: 2
  }, {
    text: "Tennis",
    id: 3
  }, {
    text: "Volleyball",
    id: 4
  }];