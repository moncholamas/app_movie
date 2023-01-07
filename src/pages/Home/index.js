import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import axiosReq from "../../config/axiosReq";


const HomePage = () => {
    const [users, setUsers] = useState(null);
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

    return (
        <Container>
            <Header 
                titulo="Home"
            />
        </Container>
    )
}

export default HomePage;