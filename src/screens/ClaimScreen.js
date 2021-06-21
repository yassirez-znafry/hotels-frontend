import React, { useState, useEffect } from 'react'
import { addClaim, addReservation, getRoomById } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const ClaimScreen = () => {

    const [content, setContent] = useState("") 
    const [userInfos, setUserInfos] = useState({});
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

    let user = JSON.parse(localStorage.getItem("userInfos"));
    console.log(user)
    setUserInfos(user);

  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    const claimRequest = {
        content,
        processed: false
      };

    console.log(claimRequest)

    addClaim(console.log(claimRequest))
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }
  

  
    return (
        <>
             <Form onSubmit={handleSubmit}>
        <Form.Group size="sm" controlId="content">
          <Form.Label>Please write your claim</Form.Label>
          <Form.Control
            autoFocus
            type="string"
            
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        
        <Button block size="lg" type="submit">
          Send Claim
        </Button>
      </Form>

        </>
    )
}

export default ClaimScreen
