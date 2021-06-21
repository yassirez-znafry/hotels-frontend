import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { deleteReservation, getAllReservationsForCurrentUser, getCurrentUserInfos } from "../Api";
import Room from '../components/Room';



const HomeScreen = () => {
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    getAllReservationsForCurrentUser()
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  function handleDelete(e, index){
    e.preventDefault();

    console.log(reservations[index-1]);

    // const reservationRequest = {
    //   reservationId : reservations[index].reservationId,
    //   roomId : reservations[index].roomId,
    //   userId : reservations[index].userId,
    //   reservationDate : reservations[index].reservationDate,
    //   reservationCheckInDate : reservations[index].reservationCheckInDate,
    //   reservationCheckOutDate : reservations[index].reservationCheckOutDate,
    //   adultsNumber : reservations[index].adultsNumber,
    //   childrenNumber : reservations[index].childrenNumber
    // };

    console.log(reservations[index-1]);
    if(window.confirm("Are you sure?")){
      deleteReservation(reservations[index-1])
      .then((res) => {
        alert("Reservation Canceled!!");
      })
      .catch((err) => console.log(err));
    }
  }

  function handleUpdate(e, reservationId){
    e.preventDefault();
    window.location = "/reservation/"+reservationId;
  }

  function handleClaim(e){
    e.preventDefault();
    window.location = "/claim/";
  }
  
  console.log(reservations)
  

   return (
        <div>
            <center><h3>My Reservations</h3></center>
            <br/>
            <br/>
            <Container>
                <Row>
                  <Col>ReservationId</Col>  
                  <Col>RoomId</Col>  
                  <Col>Check In Date</Col> 
                  <Col>Check Out Date</Col> 
                  <Col>Adults Number</Col>
                  <Col>Children Number</Col>
                  <Col>Cancel</Col>
                  <Col>Update</Col>
                </Row>
                <hr/>

                {reservations.map((reservation, index) => {
                    return<><br/><Row>
                            <Col>{reservation.reservationId}</Col>
                            <Col>{reservation.roomId}</Col>
                            <Col>{reservation.reservationCheckInDate}</Col>
                            <Col>{reservation.reservationCheckOutDate}</Col>
                            <Col>{reservation.adultsNumber}</Col>
                            <Col>{reservation.childrenNumber}</Col>
                            <Col><a href="#" onClick={(e) => handleDelete(e, reservation.reservationId)}><i class="fas fa-trash"></i></a></Col>
                            <Col><a href="#" onClick={(e) => handleUpdate(e, reservation.reservationId)}><i class="fas fa-pen"></i></a></Col>
                            </Row></>
                })}
                
            </Container>
            <Button block size="" href="#" onClick={(e) => handleClaim(e)} style={{backgroundColor: "lightblue", marginTop: "100px"}}>
          Add Claim
        </Button>
        </div>
    )
}



export default HomeScreen
