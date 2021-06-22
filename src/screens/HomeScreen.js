import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getAllRooms } from "../Api";
import Room from '../components/Room';



const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  
  
  
  useEffect(() => {
    getAllRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  
  console.log(rooms)
  


   return (

      <>
            <br/>
            <center><h3>All Rooms</h3></center>
            <br/>
          <Row >
            
            {rooms.map(function(room, index){  
       
                          return <Col key={room.roomId} sm={12} md={6} lg={4} xl={3}>
                <Room room= {room}/>
              </Col>     
})}
                                
          </Row>
          
        </>
       
    )
}



export default HomeScreen
