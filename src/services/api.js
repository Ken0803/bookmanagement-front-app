import axios from 'axios';

const API_URL = "http://localhost:8000";

export let API = axios.create({
  baseURL: API_URL,
  headers: axios.defaults.headers.common
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};