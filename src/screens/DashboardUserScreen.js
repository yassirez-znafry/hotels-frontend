import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Container} from 'react-bootstrap'
import { increaseAccessLevel, addARent, getAllClaims, getAllRents, getAllRentsByUserId, getAllReservations, getAllReservationsByUserId, getAllUsers, getUserById} from "../Api";

const DashboardUserScreen = ({match}) => {

    const userId = match.params.id
  
  const [dashboardUserInfos, setDashboardUserInfos] = useState({});
  const [reservations, setReservations] = useState([]);
  const [rents, setRents] = useState([]);
  const [claims, setClaims] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }
    setDashboardUserInfos(JSON.parse(localStorage.getItem("userInfos")));
    console.log(JSON.parse(localStorage.getItem("userInfos")))

    getUserById(userId)
    .then((res) => {
        setUser(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))

    getAllReservationsByUserId(userId)
    .then((res) => {
        setReservations(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))


    getAllRentsByUserId(userId)
    .then((res) => {
        setRents(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))


  }, []);

  function handleAddAsARent(e, index){
    e.preventDefault();

    const rentRequest = reservations[index];

    addARent(rentRequest)
    .then((res) => {
        alert("Rent added successfully");
        window.location.reload();
    })
    .catch((err) => {console.log(err);alert("Something went wrong!! Try again!");})
  }

  function handleAddPayment(e, rentId){
    e.preventDefault();
    window.location = `/dashboard_payment/${userId}/${rentId}`   
  }

  function handleLevelUp(e){
    e.preventDefault();

    increaseAccessLevel(user)
    .then((res) => {
      alert("Access level updated successfully!! Refresh to see changes!!");
    })
    .catch((err) => {
      alert("Something went wrong!! Try again later!!");
      console.log(err)
    });
  }

  return (
    <div>
            <br/>
            <center><h3>Infos About the User - {dashboardUserInfos.username}</h3></center>
            <br/>
            <Container>
            <Row>
                  <Col>UserId</Col>  
                  <Col>Email</Col>  
                  <Col>Access Level</Col>
                  {user.accessLevel == 0 ? <Col>Level Up</Col> : ""}
                </Row>
                <hr/>
                <Row>
                  <Col>{user.id}</Col>  
                  <Col>{user.email}</Col>  
                  <Col>{user.accessLevel}</Col>
                  {user.accessLevel == 0 ? <Col><a href="" onClick={(e) => handleLevelUp(e)}>Level Up</a></Col> : ""}
                </Row>
            </Container>
            <br/>
            <br/>
            <br/>

            <center><h3>All Reservations - {reservations.length}</h3></center>
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
                  <Col>Add as a rent</Col>
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
                            <Col><a href="#" onClick={(e) => handleAddAsARent(e, index)}><i class="fas fa-plus-circle"></i></a></Col>
                            </Row></>
                })}
                
            </Container>

            <br/><hr/><br/>

            <center><h3>All Rents - {rents.length}</h3></center>
            <br/>
            <br/>
            <Container>
                <Row>
                  <Col>RentId</Col>  
                  <Col>Paid</Col>  
                  <Col>ReservationId</Col> 
                  <Col>Add Payment</Col> 
                </Row>
                <hr/>

                {rents.map((rent, index) => {
                    return<><br/><Row>
                            <Col>{rent.id}</Col>
                            <Col>{rent.paid ? "True" : "False"}</Col>
                            <Col>{rent.reservationId}</Col>
                            <Col>{rent.paid ? "": <a href="#" onClick={(e) => handleAddPayment(e, rent.id)}>Add Payment</a>}</Col>
                            </Row></>
                })}
                
            </Container>

        </div>
  );
}

export default DashboardUserScreen
