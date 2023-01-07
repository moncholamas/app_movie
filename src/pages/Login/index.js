import { Col, Container, Row } from "react-bootstrap";
import FormLogin from "../../components/Forms/Login";
import LogoLogin from "../../assets/logoLogIn";
import Header from "../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


const LoginPage = () => {
    const authUser = useContext(AuthContext)

    if( authUser.isAuthenticated() ) {
        return (<Navigate to={"/profile"} replace />)
    }
    return (
        <Container>
            <Header
                titulo='Iniciar Sesión'
            />
            <Row>
                <Col>
                    <LogoLogin />
                </Col>
                <Col sm={12} lg={6}>
                    <FormLogin />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;