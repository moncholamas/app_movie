import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axiosReq, { config } from "../../config/axiosReq";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';


const TableMovies = () => {
    const [allMovies, setAllMovies] = useState(null);

    dayjs.extend(relativeTime);

    const handleShowMore = (e) => {
        console.log(e.target.value  )
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
        try {
            const result = await axiosReq.get('/movies', config())
            setAllMovies(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <Container>
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