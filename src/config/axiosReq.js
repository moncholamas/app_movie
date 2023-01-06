import axios from 'axios'
import url from './urlApi'

const token = localStorage.getItem('token') || '';

// crea una instancia de axios con la url de la api como base
const axiosReq = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` }
})

export default axiosReq