import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LogoMoveUp from "../../assets/logoUpMovie";
import FormLogUp from "../../components/Forms/LogUp";
import Header from "../../components/Header";
import axiosReq from "../../config/axiosReq";


const NewPage = () => {
    const [users, setUsers] = useState(null);
    const [formValues, setFormvalues] = useState()
    const [loged, setLoged] = useState(false)



    return (
        <Container>
            <Header
                titulo='Cargar una nueva pelicula'
            />
            <Row>
                <Col sm={12} lg={6}>
                    <FormLogUp />
                </Col>
                <Col>
                    <LogoMoveUp />
                </Col>
            </Row>
        </Container>
    )
}

export default NewPage;