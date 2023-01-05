import axios from 'axios'
import url from './urlApi'

// crea una instancia de axios con la url de la api como base
const axiosReq = axios.create({
    baseURL: url
})

export default axiosReq