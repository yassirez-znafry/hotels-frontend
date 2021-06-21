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


//Claim
export function addClaim(claimRequest){
  return axios.post(API_BASE_URL + "/claim", claimRequest, autorization);

}


// Auth
export function getCurrentUserInfos(){
  return axios.get(API_BASE_URL + "/auth/user/myInfos", autorization)
}

export function getCurrentUser(user_id){
  return axios.get(API_BASE_URL + "/auth/user/" + user_id, autorization)
}

export function login(loginRequest) {
  return axios.post(API_BASE_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest) {
  return axios.post(API_BASE_URL + "/auth/signup", signupRequest);
}


// Images
export function uploadImage(file) {
  return axios.post(API_BASE_URL + "/auth/upload", file, autorization);
}

export function getImage() {
  return axios.get(API_BASE_URL + "/auth/files", autorization);
}



