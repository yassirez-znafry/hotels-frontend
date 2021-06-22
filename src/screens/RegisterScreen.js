import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { signup } from "../Api";



const RegisterScreen = () => {
 

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleDropdownChange(e) {
    setUserType( e.target.value );
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log(userType);
    console.log(username);
    console.log(email);
    console.log(password);


    const signupRequest = {
        username: username,
        email,
        password,
        image: "imgs/default.svg",
      };

      signup(signupRequest)
        .then((res) => {
          alert("Activation email sent!!")
          console.log(res.data);
        })
        .catch((err) => {
          alert("Something went wrong!! Try agin later!!")
          console.log(err);
        });

  }



  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterScreen