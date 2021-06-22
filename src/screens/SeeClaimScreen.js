import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Container} from 'react-bootstrap'
import { getAllClaims, getAllRents, getAllReservations, getAllUsers, getClaimById, getUserById, updateClaim} from "../Api";


const SeeClaimScreen = ({match}) => {

  const claimId = match.params.id
  console.log(claimId)
  const [dashboardUserInfos, setDashboardUserInfos] = useState({});
  const [claim, setClaim] = useState([]);
  

    useEffect(() => {
    
    if(!localStorage.getItem("username")){
      window.location = "/";
    }


    getClaimById(claimId)
    .then((res) => {
        setClaim(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))

    


    setDashboardUserInfos(JSON.parse(localStorage.getItem("userInfos")));
    console.log(JSON.parse(localStorage.getItem("userInfos")))

    console.log(claim)
    console.log(claim.userId)
    
    


  }, []);

  
function handleProcess(e, claimId){
    e.preventDefault();
    const claimRequest = {
        id: claimId,
        content: claim.content,
        processed: true,
        userId: claim.userId
    }
    updateClaim(claim.id, claimRequest)
    .then((res) => {
        setClaim(res.data)
        console.log(res.data)
    })
    .catch((err) => console.log(err))
    window.location = "/dashboard_claim/"+claimId;
  }


console.log(claim)
  

return (
  <>

        <br/><br/>
        <Container>
           <Row>
                  <Col>ClaimId</Col>  
                  <Col>Content</Col>  
                  <Col>Processed</Col> 
                  <Col>user Id</Col>
                  <Col>Make as processed</Col> 
                </Row>

                <br/><hr/><br/>
                

                
                    <Row>
                            <Col>{claim.id}</Col>
                            <Col>{claim.content}</Col>
                            <Col>{claim.processed ? "True" : "False"}</Col>
                            <Col>{claim.userId}</Col>
                            <Col>{claim.processed ? "" :<a href="#" onClick={(e) => handleProcess(e, claim.id)}>process</a>}</Col>

                              

                            </Row>
                
        </Container>

        </>
    )
}

export default SeeClaimScreen
