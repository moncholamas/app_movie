import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import LogoMoveUp from "../../assets/logoUpMovie";
import FormMovie from "../../components/Forms/Movie";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";


const NewPage = () => {
    const authUser = useContext(AuthContext)

    if( ! authUser.isAuthenticated() ) {
        return (<Navigate to={"/login"} replace />)
    }


    return (
        <Container>
            <Header
                titulo='Cargar una nueva pelicula'
            />
            <Row>
                <Col sm={12} lg={6}>
                    <FormMovie />
                </Col>
                <Col>
                    <LogoMoveUp />
                </Col>
            </Row>
        </Container>
    )
}

export default NewPage;