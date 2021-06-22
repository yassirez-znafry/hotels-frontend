import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Container} from 'react-bootstrap'
import { deleteRoomById, getAllClaims, getAllRents, getAllReservations, getAllRooms, getAllUsers} from "../Api";

const DashboardScreen = () => {
  
  const [dashboardUserInfos, setDashboardUserInfos] = useState({});
  const [reservations, setReservations] = useState([]);
  const [rents, setRents] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
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

    getAllRooms()
    .then((res) => {
        setRooms(res.data)
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

  function handleDeleteRoom(e, index){
    e.preventDefault();

    deleteRoomById(rooms[index].roomId)
    .then((res) => {
      alert("Room deleted successfully!!")
      window.location.reload()
      console.log(res.data)
    })
    .catch((err) => {
      alert("Something went wrong!! Try again later!!")
      console.log(err)
      console.log(rooms[index])
    })
    
  }

  function handleModifyRoom(e, index){
    e.preventDefault();
    console.log(rooms[index]);
    window.location = "/dashboard_modify_room/" + rooms[index].roomId
  }

  function handleAddRoom(e){
    e.preventDefault()
    if(JSON.parse(localStorage.getItem("userInfos")).accessLevel == 2){
      console.log(JSON.parse(localStorage.getItem("userInfos")).accessLevel)
      window.location = "/dashboard_add_room"
    }
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

            
            <br/><hr/><br/>

            <center><h3>All Rooms - {rooms.length} - <Button href="#"  onClick={(e) => handleAddRoom(e)}> Add New Room </Button></h3></center>
            <br/>
            <br/>
            <Container>
                <Row>
                  <Col>Room Number</Col>  
                  <Col>Price</Col>  
                  <Col>Type</Col> 
                  <Col>Status</Col> 
                  <Col>Delete</Col>
                  <Col>Modify</Col>
                </Row>
                <hr/>

                {rooms.map((room, index) => {
                    return<><br/><Row>
                            <Col>{room.roomNumber}</Col>
                            <Col>{room.roomPrice}</Col>
                            <Col>{room.roomType}</Col>
                            <Col>{room.roomStatus}</Col>
                            <Col><a href="#" onClick={(e) => handleDeleteRoom(e, index)}>Delete</a></Col>
                            <Col><a href="#" onClick={(e) => handleModifyRoom(e, index)}>Modify</a></Col>
                            </Row></>
                })}
                
            </Container>
            

        </div>
  );
}

export default DashboardScreen
