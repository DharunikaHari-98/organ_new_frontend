import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const http = axios.create({ baseURL });

if (process.env.NODE_ENV === 'development') {
  console.log('[HTTP] baseURL =', baseURL);
}

export default http;
