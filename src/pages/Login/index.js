import { Col, Container, Row } from "react-bootstrap";
import FormLogin from "../../components/Forms/Login";
import LogoLogin from "../../assets/logoLogIn";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


const LoginPage = () => {
    const authUser = useContext(AuthContext)

    const location = useLocation();
    const [mensaje, setMensaje] = useState(null)
    

    useEffect(()=>{
        if(location.state){
            setMensaje(location.state.mensaje);
        }
    },[location.state])

    if( authUser.isAuthenticated() ) {
        return (<Navigate to={"/profile"} replace />)
    }
    return (
        <Container>
            <Header
                titulo='Iniciar Sesión'
                mensaje={mensaje}
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