import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosReq, { config } from '../../config/axiosReq';
import { AuthContext } from '../../context/AuthContext';

const NavMenu = () => {
    const navigate = useNavigate();
    const [logeado, setLogeado] = useState(false);
    const [loading, setLoading] = useState(false);
    const userAuth = useContext(AuthContext);
    const { user } = userAuth.authState;

    const logout = async () => {
        setLoading(true)
        try {
            await axiosReq.get('/logout', config())
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            userAuth.setAuthState({ token: '', user: {} })
            setLogeado(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userAuth.isAuthenticated()) {
            setLogeado(true)
        }
    }, [userAuth])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>AppMovies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
                        <Nav.Link onClick={() => navigate('/ranking')}>Ranking</Nav.Link>
                        <Nav.Link onClick={() => navigate('/new')}>Nueva</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            logeado ?
                                <>
                                    {/* si esta logeado se muestra el nombre y el boton para cerrar sesion */}
                                    <Nav.Link onClick={() => navigate('/profile')}>{user.name}</Nav.Link>
                                    {
                                        loading ?
                                            <Button variant= "danger" disabled={loading} onClick={logout}>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span>Saliendo</span>
                                            </Button>
                                            :
                                            <Button variant= "danger" disabled={loading}onClick={logout}>
                                                <span>Salir</span>
                                            </Button>
                                    }
                                </>
                                :
                                <Button variant="primary" onClick={() => navigate('/login')}>Ingresar</Button>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;

