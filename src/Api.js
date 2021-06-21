export const ACCESS_TOKEN = "token";
export const API_BASE_URL = "http://localhost:8080/api";
export const STORY_LIST_SIZE = 20;

const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const autorization = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  },
};


// Rooms
export  function  getAllRooms() {
   
  return axios.get(API_BASE_URL + "/room/");
  
}

export function getRoomById(room_id){
  return axios.get(API_BASE_URL + "/room/"+room_id);
}


//Reservations 
export function getAllReservations(){
  return axios.get(API_BASE_URL + "/reservation/", autorization);
}

export function getAllReservationsByUserId(user_id){
  return axios.get(API_BASE_URL + "/reservation/user/"+user_id, autorization);
}

export function getAllReservationsForCurrentUser(){
  return axios.get(API_BASE_URL + "/reservation/current_user", autorization);
}

export function addReservation(reservationRequest){
  return axios.post(API_BASE_URL + "/reservation/add", reservationRequest, autorization);
}

export function deleteReservation(reservationRequest){
  return axios.post(API_BASE_URL + "/reservation/cancel", reservationRequest, autorization);

}

export function modifyReservation(reservationRequest){
  return axios.post(API_BASE_URL + "/reservation/modify", reservationRequest, autorization);

}

// Rents
export function getAllRents(){
  return axios.get(API_BASE_URL + "/rent/", autorization);
}

export function getAllRentsByUserId(user_id){
  return axios.get(API_BASE_URL + "/rent/user/"+user_id, autorization);
}

export function addARent(rentRequest){
  return axios.post(API_BASE_URL + "/rent/add", rentRequest, autorization);
}


//Claim
export function addClaim(claimRequest){
  return axios.post(API_BASE_URL + "/claim/", claimRequest, autorization);
}

export function getAllClaims(){
  return axios.get(API_BASE_URL + "/claim/", autorization);
}


// Payment
export function addPayment(paymentRequest){
  return axios.post(API_BASE_URL + "/payment/add", paymentRequest, autorization);
}

export function getPaymentSumByRentId(rent_id){
  return axios.get(API_BASE_URL + "/payment/sum/"+rent_id, autorization);
}


// Auth
export function getCurrentUserInfos(){
  return axios.get(API_BASE_URL + "/auth/user/myInfos", autorization)
}

export function getUserById(user_id){
  return axios.get(API_BASE_URL + "/auth/user/" + user_id, autorization)
}

export function login(loginRequest) {
  return axios.post(API_BASE_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest) {
  return axios.post(API_BASE_URL + "/auth/signup", signupRequest);
}

export function getAllUsers(){
  return axios.get(API_BASE_URL + "/auth/", autorization);
}




// Images
export function uploadImage(file) {
  return axios.post(API_BASE_URL + "/auth/upload", file, autorization);
}

export function getImage() {
  return axios.get(API_BASE_URL + "/auth/files", autorization);
}



