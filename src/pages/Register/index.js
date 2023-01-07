import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import LogoLogUp from "../../assets/LogoLogUp";
import FormLogUp from "../../components/Forms/LogUp";


const RegisterPage = () => {

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