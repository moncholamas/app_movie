import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import axiosReq from '../../../config/axiosReq';
import { AuthContext } from '../../../context/AuthContext';

const FormLogin = () => {
    const formInit = {
        email: "",
        password: ""
    }
    const userAuth = useContext(AuthContext)
    const [formValues, setFormvalues] = useState(formInit);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const saveSesion = ({access_token, user}) => {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user',JSON.stringify(user))
        userAuth.setAuthState({token: access_token, user})
    }

    const sendCredentials = async () => {
        setLoading(true)
        try {
            const result = await axiosReq.post('/login', formValues)
            saveSesion(result.data);
            navigate('/')
        } catch (error) {
            console.log(error)
            //setError(error)
        } finally {
            setLoading(false)
        }
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        }else{
            sendCredentials()
        }
    };

    const handleInput = (e) => {
        setError(null)
        const { value, name } = e.target
        setFormvalues({ ...formValues, [name]: value })
    }

    const clearForm = () => {
        setFormvalues(formInit);
        setError(null);
        setValidated(false)
    }


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3" style={{ textAlign: 'left' }}>
                <Form.Group as={Col} lg="12" controlId="validationCustom01">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        name="email"
                        required
                        type="email"
                        placeholder="email"
                        value={formValues.email}
                        onChange={handleInput}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group as={Col} lg="12" controlId="validationCustom02">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                        name="password"
                        required
                        type="password"
                        placeholder="password"
                        value={formValues.password}
                        onChange={handleInput}
                        disabled={loading}
                    />
                </Form.Group>
            </Row>
            <Button type="submit" disabled={loading}>
                { loading? "Iniciando Sesion" : "Inicar Sesión"}
            </Button>
            <Button variant="light" onClick={clearForm} disabled={loading} >Limpiar Formulario</Button>
            <Row>
                <Link to="/register">Todavia no tengo cuenta.</Link>
            </Row>
            {
                error !== null ?

                    <Alert variant={'danger'}>
                        {error}
                    </Alert>
                    :
                    null
            }
        </Form>

    )
}

export default FormLogin;