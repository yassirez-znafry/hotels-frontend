import React, { useState, useEffect } from 'react'
import { modifyReservation} from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const ReservationScreen = ({match}) => {

    const reservationId = match.params.id
    

    const [adultsNumber, setAdultsNumber] = useState(0)
    const [childrenNumber, setChildrenNumber] = useState(0)
    const reservationDate = "0000-00-00"
    const [reservationCheckInDate, setReservationCheckInDate] = useState("")
    const [reservationCheckOutDate, setReservationCheckOutDate] = useState("")

    const [reservationUserInfos, setReservationUserInfos] = useState({});


     useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }
      setReservationUserInfos(JSON.parse(localStorage.getItem("userInfos")));

  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    const reservationRequest = {
        reservationId,
        reservationDate,
        reservationCheckInDate,
        reservationCheckOutDate,
        adultsNumber,
        childrenNumber,
        userId: reservationUserInfos.id
      };

      console.log(reservationRequest)

    modifyReservation(reservationRequest)
      .then((res) => {
        console.log(res.data)
        alert("Modification successed")
      })
      .catch((err) => console.log(err))


  }

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="adultsNumber">
          <Form.Label>Adults Number</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            
            value={adultsNumber}
            onChange={(e) => setAdultsNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="childrenNumber">
          <Form.Label>Children Number</Form.Label>
          <Form.Control
            type="number"
            value={childrenNumber}
            onChange={(e) => setChildrenNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="checkindate">
          <Form.Label>Check in date</Form.Label>
          <Form.Control
            type="date"
            value={reservationCheckInDate}
            onChange={(e) => setReservationCheckInDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="checkoutdate">
          <Form.Label>Check out date</Form.Label>
          <Form.Control
            type="date"
            value={reservationCheckOutDate}
            onChange={(e) => setReservationCheckOutDate(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Update
        </Button>
      </Form>
    )
}

export default ReservationScreen
