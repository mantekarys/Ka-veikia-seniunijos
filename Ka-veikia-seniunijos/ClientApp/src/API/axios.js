import axios from 'axios'

const baseURL = 'http://localhost:5000'
export const apiClient = axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
    },
  });