import React, { useState, useEffect } from 'react'
import { addClaim, addReservation, getRoomById } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const ClaimScreen = () => {

    const [content, setContent] = useState("") 
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    const claimRequest = {
        content,
        processed: false
      };

    console.log(claimRequest)

    addClaim(claimRequest)
      .then((res) => {
        console.log(res.data)
        alert("Claim sent successfully");
        window.location = "/profile"
      })
      .catch((err) => {
        alert("Something went wrong!! Try again later.")
        console.log(err)
      })
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
