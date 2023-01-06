import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import axiosReq from '../../../config/axiosReq';

const FormLogin = () => {
    const formInit = {
        email: "",
        password: ""
    }
    const [formValues, setFormvalues] = useState(formInit);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const saveSesion = (dataSesion) => {
        console.log('login', dataSesion)
    }

    const sendCredentials = async () => {
        try {
            const result = await axiosReq.post('/login', formValues)
            localStorage.setItem('token', result.data.access_token)
            saveSesion(result.data)
            navigate('/')
        } catch (error) {
            setError(error.config.data)
        }
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        sendCredentials()
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
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Inicar Sesión</Button>
            <Button variant="light" onClick={clearForm}>Limpiar Formulario</Button>
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