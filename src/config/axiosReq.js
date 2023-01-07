import axios from 'axios'
import url from './urlApi'


const config = () =>{
    const token = localStorage.getItem('token'); 
    return { headers: { Authorization: `Bearer ${token}` } }
} 

// crea una instancia de axios con la url de la api como base
const axiosReq = axios.create({
    baseURL: url
})

export { config }

export default axiosReq