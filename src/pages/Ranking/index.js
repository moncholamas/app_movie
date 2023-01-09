import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import TableRanking from "../../components/TableRating/Index";
import axiosReq from "../../config/axiosReq";


const RankingPage = () => {
    const [comentarios, setComentarios] = useState([])
    const handleShowCommentaries = async (e) => {
        const id_movie = e.target.value
        try {
            const result = await axiosReq.get(`/movies/commentaries/${id_movie}`);
            setComentarios(result.data)
        } catch (error) { 
            console.log(error)
        }
    }

    return (
        <Container>
            <Header
                titulo="Nuestras 5 películas más votadas"
            />
            <Row>
                <Col sm={12} lg={8}>
                    <Container>
                        <TableRanking 
                            handleShowCommentaries={handleShowCommentaries}
                        />
                    </Container>
                </Col>
                <Col sm={12} lg={4}>
                    <Container>
                        <h3>Opiniones</h3>
                        {
                            comentarios ? 
                            comentarios.map( com => {
                                return (
                                    <div>
                                        <p>  <Badge bg="primary"> Valoración: {com.rating}</Badge> {com.commentary} </p> 
                                        <hr />
                                    </div>
                                )
                            })
                            : null
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default RankingPage;