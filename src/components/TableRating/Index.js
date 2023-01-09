import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../Header";
import axiosReq, { config } from "../../config/axiosReq";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const TableRanking = ({handleShowCommentaries}) => {
    const [moviesRating, setMoviesRating] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getMovies = async () => {
        setLoading(true);
        try {
            const result = await axiosReq.get('/movies/rating', config())
            setMoviesRating(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const handleShowMore = (e) => {
        const id_movie = e.target.value
        navigate(`/details/${id_movie}`)
    }
    

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.title,
        },
        {
            name: 'Géneros',
            selector: row => row.gender,
            hide:'sm'
        },
        {
            name: 'Puntuacion',
            selector: row => row.rate,
            hide: 'sm'
        },
        { 
            cell:(row) => <Button variant="secondary" size="sm" onClick={handleShowMore} value={row.id_movie}>Ver más</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        { 
            cell:(row) => <Button variant="secondary" size="sm" onClick={handleShowCommentaries} value={row.id_movie}>Comentarios</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    useEffect(() => {
       getMovies()
    }, [] )

    return (
        <Container>
            {
                loading && <Loading texto="Obteniendo listado actualizado" />
            }
            {
                moviesRating &&
                <DataTable
                    title={"Nuestras Películas"}
                    columns={columns}
                    data={moviesRating}
                />

            }
        </Container>
    )
}

export default TableRanking;