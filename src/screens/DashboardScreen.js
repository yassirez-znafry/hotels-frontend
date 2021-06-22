import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Container} from 'react-bootstrap'
import { getAllClaims, getAllRents, getAllReservations, getAllUsers} from "../Api";

const DashboardScreen = () => {
  
  const [dashboardUserInfos, setDashboardUserInfos] = useState({});
  const [reservations, setReservations] = useState([]);
  const [rents, setRents] = useState([]);
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  

  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }
    setDashboardUserInfos(JSON.parse(localStorage.getItem("userInfos")));
    console.log(JSON.parse(localStorage.getItem("userInfos")))

    getAllReservations()
    .then((res) => {
        setReservations(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))


    getAllRents()
    .then((res) => {
        setRents(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))

    getAllUsers()
    .then((res) => {
        setUsers(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))

    getAllClaims()
    .then((res) => {
        setClaims(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))


  }, []);

  function handleSeeReservations(e, userId){
    e.preventDefault();
    window.location = "/dashboard_user/"+userId;
  }

  function handleSeeClaim(e, claimID){
    e.preventDefault();
    window.location = "/dashboard_claim/"+claimID;
  }


  return (
    <div>


            <center><h3>All Users - {users.length}</h3></center>
            <br/>
            <br/>
            <Container>
                <Row>
                  <Col>UserId</Col>  
                  <Col>Username</Col>  
                  <Col>Email</Col> 
                  <Col>Access Level</Col> 
                  <Col>See User</Col> 
                </Row>
                <hr/>

                {users.map((user, index) => {
                    return<><br/><Row>
                            <Col>{user.id}</Col>
                            <Col>{user.username}</Col>
                            <Col>{user.email}</Col>
                            <Col>{user.accessLevel}</Col>
                            <Col><a href="#" onClick={(e) => handleSeeReservations(e, user.id)}>See User</a></Col>
                            </Row></>
                })}
                
            </Container>

            <br/><hr/><br/>

            <center><h3>All Claims - {claims.length}</h3></center>
            <br/>
            <br/>
            <Container>
                <Row>
                  <Col>ClaimId</Col>  
                  <Col>Content</Col>  
                  <Col>Processed</Col> 
                  <Col>UserId</Col>
                  <Col>See claim</Col> 
                </Row>
                <hr/>

                {claims.map((claim, index) => {
                    return<><br/><Row>
                            <Col>{claim.id}</Col>
                            <Col>{claim.content}</Col>
                            <Col>{claim.processed ? "True" : "False"}</Col>
                            <Col>{claim.userId}</Col>
                             <Col><a href="#" onClick={(e) => handleSeeClaim(e, claim.id)}>See Claim</a></Col> 

                            </Row></>
                })}
                
            </Container>

            <br/><hr/><br/>


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
                </Row>
                <hr/>

                {rents.map((rent, index) => {
                    return<><br/><Row>
                            <Col>{rent.id}</Col>
                            <Col>{rent.paid ? "True" : "False"}</Col>
                            <Col>{rent.reservationId}</Col>
                            </Row></>
                })}
                
            </Container>

        </div>
  );
}

export default DashboardScreen
