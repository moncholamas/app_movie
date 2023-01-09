import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../Header";
import axiosReq, { config } from "../../config/axiosReq";
import DataTable from "react-data-table-component";

const TableRanking = ({handleShowCommentaries}) => {
    const [moviesRating, setMoviesRating] = useState(null)

    const getMovies = async () => {
        try {
            const result = await axiosReq.get('/movies/rating', config())
            setMoviesRating(result.data)
        } catch (error) {
            console.log(error)
        }
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
            cell:(row) => <Button variant="secondary" size="sm"  value={row.id_movie}>Ver más</Button>,
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