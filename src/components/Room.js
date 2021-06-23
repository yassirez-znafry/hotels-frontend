import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


import React from 'react'

const Room = ({room}) => {
    return (
        <Card className='my-3 p-3 rounded'>
      <Link to={`/room/${room.roomId}`}>
          <Card.Img src ={room.roomImage} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/room/${room.roomId}`} room={room}>
          <Card.Title as='div'>
            <strong>{room.roomType}</strong>
          </Card.Title>
        </Link>

        

        <Card.Text as='h3'>${room.roomPrice}</Card.Text>
      </Card.Body>
    </Card>
    )
}

export default Room
