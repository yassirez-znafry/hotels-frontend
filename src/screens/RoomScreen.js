import React, { useState, useEffect } from 'react'
import { getAllRooms } from "../Api";
import Room from '../components/Room';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';



const RoomScreen = ({match}) => {

    const roomId = match.params.id
    
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState([]);
  
  useEffect(() => {
    getAllRooms()
      .then((res) => {
        setRooms(res.data);

        for (let index = 0; index < res.data.length; index++) {
      const element = res.data[index];
      console.log(element)
      if (element.roomId==roomId) {
          setRoom(element);
          console.log(room)
      }
  }

      })
      .catch((err) => console.log(err));
  }, []);


  
    

  console.log(room)

    return (
        <>
          <Row>
            <Col md={6}>
              <Image src='/logo192.png' alt="{room.name}" fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{room.roomStatus}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  
                </ListGroup.Item>
                <ListGroup.Item>Price: ${room.roomPrice}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {room.roomType}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${room.roomPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {room.roomId > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  

                  <ListGroup.Item>
                      <Link to="/payment">
                    <Button
                      
                      className='btn-block'
                      type='button'
                      disabled={room.roomPrice === 0}
                    >
                      Reserve
                    </Button>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            
          </Row>
          
        </>
    )
}

export default RoomScreen
