import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import TableRanking from "../../components/TableRating/Index";
import axiosReq from "../../config/axiosReq";


const RankingPage = () => {
    const [comentarios, setComentarios] = useState([])
    const [loading, setLoading] = useState(false)
    const handleShowCommentaries = async (e) => {
        const id_movie = e.target.value;
        setLoading(true)
        try {
            const result = await axiosReq.get(`/movies/commentaries/${id_movie}`);
            setComentarios(result.data)
        } catch (error) { 
            console.log(error)
        } finally {
            setLoading(false)
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
                        {
                            comentarios.length > 0 ?  <h3>Opiniones</h3> : null
                        }
                        {
                            loading && <Loading texto="Cargando comentarios"/>
                        }
                        {
                            comentarios ? 
                            comentarios.map( (com, index) => {
                                return (
                                    <div>
                                        <p key={index}>  <Badge bg="primary"> Valoración: {com.rating}</Badge> {com.commentary} </p> 
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