import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import LogoLogUp from "../../assets/LogoLogUp";
import FormLogUp from "../../components/Forms/LogUp";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


const RegisterPage = () => {
    const authUser = useContext(AuthContext)

    if( authUser.isAuthenticated() ) {
        return (<Navigate to={"/login"} replace />)
    }

    return (
        <Container>
            <Header
                titulo='Crea una cuenta'
            />
            <Row>
                <Col>
                    <LogoLogUp />
                </Col>
                <Col sm={12} lg={6}>
                    <FormLogUp />
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage;