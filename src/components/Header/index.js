import { Col, Container, Row } from "react-bootstrap";

const Header = ({ titulo }) => {
    return (
        <Container fluid>
            <Row>
                <Col style={{disply:'flex', justifyContent:'left', textAlign:'left', padding: '20px'}}>
                    <h2>{titulo}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;