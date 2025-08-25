// src/services/http.js
import axios from 'axios';

// Normalize root URL, trim trailing slash, then add /api
const root = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/+$/, '');
const baseURL = `${root}/api`;

const http = axios.create({ baseURL });

if (process.env.NODE_ENV === 'development') {
  console.log('[HTTP] baseURL =', baseURL);
}

export default http;
