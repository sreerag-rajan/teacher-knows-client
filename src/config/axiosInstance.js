import axios from 'axios'
import { serverapi } from './api'
const instance = axios.create({
  baseURL: serverapi, 
  headers: {
    'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('__tk_userToken')) || ''}`
  }
})

export default instance;