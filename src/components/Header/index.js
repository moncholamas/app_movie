import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

const Header = ({ titulo, mensaje}) => {
    const [showMensaje, setShowMensaje] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setShowMensaje(false)
        }, 3000);
    },[showMensaje])
    return (
        <Container fluid>
            <Row>
                <Col lg={12} style={{disply:'flex', justifyContent:'left', textAlign:'left', padding: '20px'}}>
                    <h2>{titulo}</h2>
                </Col>
                <Col>
                {
                    mensaje && showMensaje ? 
                    <Alert variant={mensaje.variante} style={{margin: '20px'}}> {mensaje.texto}</Alert>
                    : null
                }
                </Col>
            </Row>
        </Container>
    )
}

export default Header;