import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import TableMovies from "../../components/TableMovies";


const HomePage = () => {
    const location = useLocation();
    const [mensaje, setMensaje] = useState(null)
    

    useEffect(()=>{
        if(location.state){
            setMensaje(location.state.mensaje);
        }
    },[location.state])

    return (
        <Container>
            <Header
                titulo="Te damos la bienvenida a AppMovies"
                mensaje={mensaje}
            />
            <Row>
                <Col sm={12} lg={12}>
                    <Container>
                        <TableMovies />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;