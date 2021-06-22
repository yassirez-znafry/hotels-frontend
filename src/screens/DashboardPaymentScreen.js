import React, { useState, useEffect } from 'react'
import { addClaim, addPayment, addReservation, getPaymentSum, getPaymentSumByRentId, getRoomById } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const DashboardPaymentScreen = ({match}) => {
    const userId = match.params.user_id
    const rentId = match.params.rent_id

    console.log("UserId" + userId);
    console.log("RentId" + rentId);

    const paymentRequest = {
        userId,
        rentId
      };

      const [paymentInfos, setPaymentInfos] = useState({});
    
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

    getPaymentSumByRentId(rentId)
    .then((res) => {
        setPaymentInfos(res.data);
        console.log(res.data);
    })
    .catch((err) => console.log(err))

  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    console.log(paymentRequest)

    addPayment(paymentRequest)
      .then((res) => {
        console.log(res.data)
        alert("Payment added successfully");
        window.history.back()
      })
      .catch((err) => {console.log(err); alert("Payment failed!! Try again later!!");})
  }
  

  
    return (
        <>
             <Form onSubmit={handleSubmit}>
        <Form.Group size="sm" controlId="content">
          <Form.Label>Total Price</Form.Label>
          <Form.Control
            type="string"
            value={paymentInfos.sum}
            disabled
          />
        </Form.Group>
        
        <Button block size="lg" type="submit">
          Add Payment
        </Button>
      </Form>

        </>
    )
}

export default DashboardPaymentScreen
