import { useEffect, useState } from "react";
import axiosReq from "../../config/axiosReq";


const Home = () => {
    const [users, setUsers] = useState(null);

    const getUsers = async () => {
        try {
            const result = await axiosReq.get('/test')
            console.log(result)
            setUsers(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsers()
    },[])

    return (<>
        <h1>Bienvenidos</h1>
        { users && <p>Conectado a la api correctamente</p>}
    </>)
}

export default Home;