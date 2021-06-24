import React, { useState, useEffect } from 'react'
import { addReservation, getRoomById } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';



const RoomScreen = ({match}) => {

    const roomId = match.params.id
    const [room, setRoom] = useState([]);

    const [adultsNumber, setAdultsNumber] = useState(0)
    const [childrenNumber, setChildrenNumber] = useState(0)
    const reservationDate = "0000-00-00"
    const [reservationCheckInDate, setReservationCheckInDate] = useState("")
    const [reservationCheckOutDate, setReservationCheckOutDate] = useState("")

    const [userInfos, setUserInfos] = useState({});
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

    getRoomById(roomId)
      .then((res) => {
          setRoom(res.data);
          console.log(room)
      })
      .catch((err) => console.log(err));

      let user = JSON.parse(localStorage.getItem("userInfos"));
      console.log(user)
      setUserInfos(user);

    

  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    const reservationRequest = {
        reservationDate,
        reservationCheckInDate,
        reservationCheckOutDate,
        adultsNumber,
        childrenNumber,
        roomId: roomId,
        userId: userInfos.id
      };

      console.log(reservationRequest)

    addReservation(reservationRequest)
      .then((res) => {
        console.log(res.data)
        alert("Reservation added successfully")
        window.location = "/profile"
      })
      .catch((err) => {
        alert("Something went wrong!! Try again later.")
        console.log(err)
      })
    


  }
  
    

  console.log(room)

    return (

      <>
        
          <Row>
            <Col md={6}>
              <Image src='/room.jpeg' alt="{room.name}" fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{room.roomType}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${room.roomPrice}</ListGroup.Item>
                <ListGroup.Item>
                  Status: {room.roomStatus}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            
          </Row>
          <Row>
            
          </Row>
          

        <br/><br/>
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
          Reserve
        </Button>
      </Form>

        </>
    )
}

export default RoomScreen
