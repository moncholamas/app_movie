import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const NavMenu = () => {
    const navigate = useNavigate();
    const [logeado, setLogeado] = useState(false);

    const logout = () => {
        // cierra la sesion
    }

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
                                    <Nav.Link href="#" disabled>More deets</Nav.Link>
                                    <Button variant="danger" onClick={logout}>Salir</Button>
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

