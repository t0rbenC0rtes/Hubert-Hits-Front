import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with backend's deployed URL when ready
});

export default API;
