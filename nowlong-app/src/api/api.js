import axios from 'axios';
import { API_BASE_URL, FIREBASE_ID_TOKEN } from '@env';  

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${FIREBASE_ID_TOKEN}`, 
  },
});
