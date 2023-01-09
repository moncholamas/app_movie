import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axiosReq, { config } from "../../config/axiosReq";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";


const TableMovies = () => {
    const [allMovies, setAllMovies] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    dayjs.extend(relativeTime);

    const handleShowMore = (e) => {
        const id_movie = e.target.value
        navigate(`/details/${id_movie}`)
    }
    const columns = [
        {
            name: 'Titulo',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Géneros',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Fecha de ingreso',
            selector: row => row.created_at,
            format: row => dayjs(row.created_at).locale("es").fromNow(),
            sortable: true,
            hide: 'sm'
        },
        { 
            cell:(row) => <Button variant="secondary" size="sm" onClick={handleShowMore} value={row.id}>Ver más</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getMovies = async () => {
        setLoading(true)
        try {
            const result = await axiosReq.get('/movies', config())
            setAllMovies(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <Container>
            {
                loading && <Loading texto="Obteniendo listado actualizado" />
            }
            {
                allMovies && 
                <DataTable
                    title={"Nuestras Películas"}
                    columns={columns}
                    data={allMovies}
                    pagination
                />
            }
        </Container>
    )
}

export default TableMovies;