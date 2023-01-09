import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        }, 5000);
    },[])
    return(<>
        <Container style={{margin:'50px'}}>
            <h3> No pudimos encontrar esta página.</h3>
            <p>Te vamos a redirigir al inicio</p>
        </Container>
    </>)
}

export default NotFoundPage;