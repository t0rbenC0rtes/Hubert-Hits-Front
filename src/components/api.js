import axios from "axios";

const API = axios.create({
  baseURL: "https://hubert-hits-back.onrender.com", // Updated backend URL
});

export default API;