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

export  function  getAllRooms() {
   
   return axios.get(API_BASE_URL + "/room/");
  
}


export function login(loginRequest) {
  return axios.post(API_BASE_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest) {
  return axios.post(API_BASE_URL + "/auth/signup", signupRequest);
}

export function uploadImage(file) {
  return axios.post(API_BASE_URL + "/auth/upload", file, autorization);
}

export function getImage() {
  return axios.get(API_BASE_URL + "/auth/files", autorization);
}