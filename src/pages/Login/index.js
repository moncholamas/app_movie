import { Col, Container, Row } from "react-bootstrap";
import FormLogin from "../../components/Forms/Login";
import LogoLogin from "../../components/Forms/Login/logo";
import Header from "../../components/Header";


const LoginPage = () => {

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