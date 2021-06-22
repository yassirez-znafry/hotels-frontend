import React, { useState, useEffect } from 'react'
import { addClaim, addPayment, addReservation, getAllRoomStatuses, getAllRoomTypes, getPaymentSum, getPaymentSumByRentId, getRoomById, modifyRoom } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const DashboardModifyRoomScreen = ({match}) => {
    const roomId = match.params.room_id

    console.log("roomId  :  " + roomId);

    const [roomInfos, setRoomInfos] = useState({});
    const [allRoomTypes, setAllRoomTypes] = useState([])
    const [allRoomStatuses, setAllRoomStatuses] = useState([])
    

    const [roomNumber, setRoomNumber] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [roomType, setRoomType] = useState("")
    const [roomStatus, setRoomStatus] = useState("")
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

    getRoomById(roomId)
    .then((res) => {
        setRoomInfos(res.data);
        setRoomStatus(res.data.roomStatus)
        setRoomType(res.data.roomType)
        setRoomPrice(res.data.roomPrice)
        setRoomNumber(res.data.roomNumber)

        console.log(res.data);
    })
    .catch((err) => console.log(err))



    getAllRoomTypes()
    .then((res) => {
        setAllRoomTypes(res.data);
        console.log(res.data);
    })
    .catch((err) => console.log(err))

    getAllRoomStatuses()
    .then((res) => {
        setAllRoomStatuses(res.data);
        console.log(res.data);
    })
    .catch((err) => console.log(err))

  }, []);


  function handleSubmit(e){
      e.preventDefault()
      roomInfos.roomType = roomType
        roomInfos.roomStatus = roomStatus
        roomInfos.roomNumber = roomNumber
        roomInfos.roomPrice = roomPrice

        console.log(roomInfos);

        modifyRoom(roomInfos)
        .then((res) => {
            alert("Room modified successfully!!")
            window.history.back();
        })
        .catch((err) => {
            alert("Something went wrong!! Try Again Later.");
            console.log(err);
        })


    }

  

  
    return (
        <>
        <br/>
        <center><h3>Modify Room</h3></center>
        <br/>

        <Row><Col></Col><Col md={6}><Image src="/room.jpeg" fluid/></Col><Col></Col></Row>

        <br/><br/>
          <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="roomNumber">
          <Form.Label>Room Number</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="roomPrice">
          <Form.Label>Room Price</Form.Label>
          <Form.Control
            type="number"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="roomType">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            as="select">
                {allRoomTypes.map((type, index) => {
                    return <> <option value={type.roomTypeName}>{type.roomTypeName}</option> </>
                })}
            </Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="roomStatus">
          <Form.Label>Room Status</Form.Label>
          <Form.Control
            type="number"
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
            as="select">
                {allRoomStatuses.map((status, index) => {
                    return <> <option value={status.roomStatusName}>{status.roomStatusName}</option> </>
                })}
            </Form.Control>
        </Form.Group>
        <Button block size="lg" type="submit">
          Reserve
        </Button>
      </Form>

        </>
    )
}

export default DashboardModifyRoomScreen
