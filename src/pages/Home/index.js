import { useEffect, useState } from "react";
import axiosReq from "../../config/axiosReq";


const HomePage = () => {
    const [users, setUsers] = useState(null);
    const [formValues, setFormvalues] = useState()
    const [loged, setLoged] = useState(false)


    const getMovies = async () => {
        try {
            const result = await axiosReq.get('/test/token')
            console.log(result, 'conectado con token')
            setUsers(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(loged) getMovies()
    },[loged])

    return (<>
        <h1>Bienvenidos</h1>
        { users && <p>Conectado a la api correctamente</p>}

    </>)
}

export default HomePage;