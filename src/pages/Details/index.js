import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EditMovie from "../../components/Forms/EditMovie";
import FormMovie from "../../components/Forms/Movie";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import axiosReq, { config } from "../../config/axiosReq";
import { AuthContext } from "../../context/AuthContext";

const DetailsPage = () => {
    const authUser = useContext(AuthContext);
    const [detalles, setDetalles] = useState({
        user: {},
        rating: {}
    });
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [rateForm, setRateForm] = useState(null);
    const [updatingFavorite, setUpdatingFavorite] = useState(false);
    const [updatingRating, setUpdatingRating] = useState(false);
    const [uploadMessage, setUploadMessage] = useState(false);
    const [puntaje, setPuntaje] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [bloqRate, setBloqRate] = useState(true);
    const [blocCommentary, setBloqCommentary] = useState(true);
    const [error, setError] = useState(null)
    let { id_movie } = useParams();
    const navigate = useNavigate();

    const getDetalles = async () => {
        setLoading(true)
        const url = authUser.isAuthenticated() ? `/movies/details/${id_movie}` : `/movies/details/public/${id_movie}`;
        try {
            const result = await axiosReq.get(url, config());
            if( result.data.not_found ){
                navigate('/', { state: { mensaje: { texto: result.data.not_found, variant: "danger" } } })
            }
            setDetalles(result.data)
        } catch (error) {
            console.log(error)
            setError('error al obtener detalles');
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setDeleting(true)
        try {
            const result = await axiosReq.delete(`/movies/${id_movie}`, config());
            navigate('/', { state: { mensaje: { texto: result.data.msg, variant: "success" } } })
        } catch (error) {
            console.log(error)
        } finally {
            setDeleting(false)
        }
    }

    const handleFavorite = async () => {
        const { headers } = config();
        setUpdatingFavorite(true)
        try {
            const result = await axiosReq({
                method: "post",
                url: `/movies/favorite/${detalles.id}`,
                data: {
                    favorite: !detalles.favorite
                },
                headers
            })
            getDetalles();
        } catch (error) {
            console.log(error)
        } finally {
            setUpdatingFavorite(false)
        }
    }


    const handleRate = async () => {
        setUpdatingRating(true)
        const { headers } = config();
        try {
            const result = await axiosReq({
                method: "post",
                url: `/movies/rate/${detalles.id}`,
                data: {
                    rating: puntaje
                },
                headers
            })
            getDetalles();
        } catch (error) {
            console.log(error)
        } finally {
            setUpdatingRating(false)
        }
    }

    const handleCommentary = async () => {
        setUploadMessage(true)
        const { headers } = config();
        try {
            const result = await axiosReq({
                method: "post",
                url: `/movies/rate/${detalles.id}`,
                data: {
                    commentary: mensaje
                },
                headers
            })
            getDetalles();
        } catch (error) {
            console.log(error)
        } finally {
            setUploadMessage(false)
        }
    }

    useEffect(() => {
        if (detalles.rating !== null && detalles.rating.rating) {
            setPuntaje(detalles.rating.rating)
        }
        if (detalles.rating !== null && detalles.rating.commentary) {
            setMensaje(detalles.rating.commentary)
        }
    }, [detalles])


    useEffect(() => {
        getDetalles();
    }, [])

    if( ! authUser.isAuthenticated() ) {
        navigate("/login",{ state: { mensaje: { texto: "Debes iniciar sesión para continuar", variant: "success" } } });
    }


    return (
        <Container>
            {
                loading ? <Loading texto={'Obteniendo Detalles'} />
                    :
                    <>
                        <Header
                            titulo={detalles.title}
                        />
                        <Row>
                            <Col sm={12} lg={6}>
                                <EditMovie
                                    detalles={detalles}
                                    getDetalles={getDetalles}
                                />
                                <br />
                                <hr />
                                <br />
                                <Container style={{ disply: 'flex', justifyContent: 'left', textAlign: 'left', padding: '20px' }}>
                                    <h3>Acerca del ingreso</h3>
                                    <p><b>Fecha de ingreso: </b> {dayjs(detalles.created_at).format('YYYY-MM-DD')} <b>Hora</b> {dayjs(detalles.created_at).format('HH:mm')}</p>
                                    <p><b>última Actualización: </b> {dayjs(detalles.created_at).format('YYYY-MM-DD')} <b>Hora</b> {dayjs(detalles.created_at).format('HH:mm')}</p>
                                    {
                                        detalles.owner && detalles ?
                                            <>
                                                <p>Sos el propietario de esta pelicula</p>

                                                {
                                                    deleting ?
                                                        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                            Eliminando
                                                        </Button>
                                                        :
                                                        <Button variant="danger" onClick={handleDelete} disabled={deleting}>Eliminar</Button>
                                                }
                                                <p>Al eliminar la pelicula te llevaremos a la página de inicio.</p>
                                            </>
                                            :
                                            <>
                                                <p><b>Propietario:</b> {detalles.user.name} </p>
                                                <p><b>Correo Electrónico:</b> {detalles.user.email}</p>
                                            </>

                                    }
                                </Container>
                            </Col>
                            <Col >
                                <h4>Puntuaciones y Comentarios</h4>
                                <div>
                                    {
                                        updatingFavorite ?
                                            <Button variant="success" size="lg" disabled={updatingFavorite} onClick={handleFavorite}>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span>Actualizando</span>
                                            </Button>
                                            :
                                            <Button variant="success" size="lg" disabled={updatingFavorite} onClick={handleFavorite}>
                                                <span>
                                                    {detalles.rating && detalles.rating.favorite === 1 ? "Quitar de favoritas" : "Marcar como favorita"}
                                                </span>
                                            </Button>
                                    }

                                    <hr />
                                    <Form>
                                        <Row className="g-2">
                                            <Col lg>
                                                <Form.Group as={Col} lg="12" controlId="validationCustom02">
                                                    <Form.Select disabled={updatingRating} aria-label="Default select example" required name='gender' value={puntaje} onChange={(e) => setPuntaje(e.target.value)}>
                                                        <option disabled >Puntuación</option>
                                                        {[1, 2, 3, 4, 5].map(g => {
                                                            return <option key={g}>{g}</option>
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>

                                            </Col>
                                            <Col>
                                                <Form.Group as={Col} lg="4" >
                                                    {
                                                        updatingRating ?
                                                            <Button variant="success" size="lg" disabled={updatingRating}>
                                                                <Spinner
                                                                    as="span"
                                                                    animation="border"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />

                                                            </Button>
                                                            :
                                                            <Button variant="success" disabled={updatingRating || !puntaje } onClick={handleRate}> Puntuar </Button>
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                    </Form>

                                    <hr />
                                    Dejar un comentario
                                    <Form>
                                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                                style={{ height: '100px' }}
                                                value={mensaje}
                                                onChange={(e) => setMensaje(e.target.value)}
                                                disabled={setUploadMessage}
                                            />
                                        </FloatingLabel>
                                        {
                                            uploadMessage ?
                                                <Button variant="success" size="lg" disabled={uploadMessage}>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    <span>Actualizando</span>
                                                </Button>
                                                :
                                                <Button variant="success" onClick={handleCommentary} disabled={uploadMessage} > Dejar un Comentario </Button>

                                        }
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </>
            }


        </Container>
    )
}

export default DetailsPage;