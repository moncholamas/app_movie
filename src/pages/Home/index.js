import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import TableMovies from "../../components/TableMovies";


const HomePage = () => {


    return (
        <Container>
            <Header
                titulo="Te damos la bienvenida a AppMovies"
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