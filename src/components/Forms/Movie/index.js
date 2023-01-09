import React, { useContext, useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import axiosReq, { config } from '../../../config/axiosReq';
import { AuthContext } from '../../../context/AuthContext';

const FormMovie = () => {
    const genders = ['comedia', 'drama', 'terror', 'infantil', 'documentales'];
    const formInit = {
        title: "",
        description: "",
        gender: ""
    }
    const userAuth = useContext(AuthContext)
    const [formValues, setFormvalues] = useState(formInit);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmacion, setConfirmacion] = useState(null)
    const navigate = useNavigate()
    

    const uploadMovie = async () => {
        setLoading(true)
        try {
            const result = await axiosReq.post('/movies', formValues,config())
            clearForm()
            setConfirmacion(`La pelicula ${result.data.title} se agregó correctamente`)
        } catch (error) {
            setError(error.config.data)
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
        } else {
            uploadMovie()
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
        setValidated(false);
        setConfirmacion(null)
    }


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3" style={{ textAlign: 'left' }}>
                <Form.Group as={Col} lg="12" controlId="validationCustom02">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        name="title"
                        required
                        type="text"
                        placeholder="title"
                        value={formValues.title}
                        onChange={handleInput}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group as={Col} lg="12" controlId="validationCustom01">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        name="description"
                        required
                        type="text"
                        placeholder="description"
                        value={formValues.description}
                        onChange={handleInput}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group as={Col} lg="12" controlId="validationCustom02">
                    <Form.Label>Género</Form.Label>
                    <Form.Select aria-label="Default select example" name='gender' value={formValues.gender}  onChange={handleInput} disabled={loading} required>
                        <option disabled value="" selected>Selecciona un género</option>
                        {genders.map(g => {
                            return <option key={g}>{g}</option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>
            {
                loading ?
                    <Button type="submit" disabled={loading}>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span>Subiendo Nueva Pelicula</span>
                    </Button>
                    : 
                    <Button type="submit" disabled={loading}>
                        <span>Subir Nueva Película</span>
                    </Button>
            }
            <Button variant="light" onClick={clearForm} disabled={loading}>Limpiar Formulario</Button>
            {
                error !== null ?

                    <Alert variant={'danger'}>
                        {error}
                    </Alert>
                    :
                    null
            }

            {
                confirmacion && <Alert variant='success'> {confirmacion}</Alert>
            }
        </Form>

    )
}

export default FormMovie;