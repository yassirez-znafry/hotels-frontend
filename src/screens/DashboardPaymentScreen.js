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

      const [withCash, setWithCash] = useState(true)
      const [accountNumber, setAccountNumber] = useState(null)
    
    
  
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

    paymentRequest.accountNumber = accountNumber
    paymentRequest.withCash = withCash
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
        <Form.Group size="sm" controlId="totalPrice">
          <Form.Label>Total Price</Form.Label>
          <Form.Control
            type="string"
            value={paymentInfos.sum}
            disabled
          />
        </Form.Group>

        <Form.Group size="lg" controlId="paymentMethod">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              if(e.target.value == "cash") setWithCash(true)
              else if(e.target.value == "card") setWithCash(false)
            }}
            as="select">
                <option value="cash">Cash</option>
                <option value="card">Card</option>
            </Form.Control>
        </Form.Group>
        
        <Form.Group size="sm" controlId="accountNumber">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            disabled={withCash ? "disabled" : "" }
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
