import axios from 'axios';

const baseURL = 'http://localhost:3000/v1/';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;