import React, { useState, useEffect } from 'react'
import { addRoom, getAllRoomStatuses, getAllRoomTypes, uploadImage } from "../Api";
import { Row, Col, Image, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';


const DashboardAddRoomScreen = () => {

  
    const [allRoomTypes, setAllRoomTypes] = useState([])
    const [allRoomStatuses, setAllRoomStatuses] = useState([])
    

    const [roomNumber, setRoomNumber] = useState(0)
    const [roomPrice, setRoomPrice] = useState(0)
    const [roomType, setRoomType] = useState("")
    const [roomStatus, setRoomStatus] = useState("")
  const [fileName, setFileName] = useState("")
  
  useEffect(() => {
    if(!localStorage.getItem("username")){
      window.location = "/";
    }

    getAllRoomTypes()
    .then((res) => {
        setAllRoomTypes(res.data);
        setRoomType(res.data[0].roomTypeName)
        console.log(res.data);
    })
    .catch((err) => console.log(err))

    getAllRoomStatuses()
    .then((res) => {
        setAllRoomStatuses(res.data);
        setRoomStatus(res.data[0].roomStatusName);
        console.log(res.data);
    })
    .catch((err) => console.log(err))

  }, []);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    console.log(file.name)
    setFileName(file.name)
    
    const formData = new FormData()
    formData.append('data', file)

    uploadImage(formData, roomNumber).then((res) => {
      console.log(res.data);
    })
      .catch((err) => console.log(err))
    
  };

  function handleSubmit(e){
      e.preventDefault()

      const roomInfos = {
        roomType,
        roomStatus,
        roomPrice,
        roomNumber,
        roomImage: "/" + roomNumber + "." + fileName.split('.').pop()
      }

        console.log(roomInfos);

        addRoom(roomInfos)
        .then((res) => {
            alert("Room added successfully!!")
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

          <Form.Group controlId='image'>
            <Form.Label>Room image </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the image'
              value={fileName}

            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadImageHandler}
            ></Form.File>
          </Form.Group>




        <Button block size="lg" type="submit">
          Add room
        </Button>
      </Form>

        </>
    )
}

export default DashboardAddRoomScreen
