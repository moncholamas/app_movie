import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Navigate } from "react-router-dom";
import LogoMoveUp from "../../assets/logoUpMovie";
import FormLogUp from "../../components/Forms/LogUp";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import axiosReq, { config } from "../../config/axiosReq";
import { AuthContext } from "../../context/AuthContext";


const ProfilePage = () => {
    const authUser = useContext(AuthContext);
    const { user } = authUser.authState;
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState(null);
    const [removing, setRemoving] = useState(false);

    const getFavorites = async () => {
        setLoading(true)
        try {
            const result = await axiosReq.get(`/movies/favorites`, config());
            setFavorites(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (e) => {
        setRemoving(true)
        const { headers } = config();
        const { value: id_movie } = e.target;
        try {
            const res = await axiosReq({
                method: "post",
                url: `/movies/favorite/${id_movie}`,
                data: {
                    favorite: false
                },
                headers
            })
            setFavorites()
            getFavorites()
        } catch (error) {
            console.log(error)
        } finally {
            setRemoving(false)
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
            hide: 'sm'
        },
        {
            cell: (row) => <Button variant="danger" size="sm" onClick={handleRemove} disabled={removing} value={row.id}>Quitar</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    useEffect(() => {
        getFavorites();
    }, [])

    if (!authUser.isAuthenticated()) {
        return (<Navigate to={"/"} replace />)
    }

    return (
        <Container>
            <Header
                titulo='Mi cuenta'
            />
            <Row>
                <Col sm={12} lg={6} >
                    <Container style={{ textAlign: "left" }}>
                        <>
                            <p><b>Nombre de usuario:</b> {user.name} </p>
                            <p><b>Correo electrónico:</b> {user.email} </p>
                            <p><b>Fecha de alta:</b> {dayjs(user.created_at).format('YYYY-MM-DD HH:mm')} </p>
                        </>
                    </Container>

                    {
                        loading ?
                            <Loading texto="cargando favoritos" />
                            :
                            <DataTable
                                title={"Mis Favoritos"}
                                columns={columns}
                                data={favorites}
                            />
                    }
                </Col>
                <Col>
                    <LogoMoveUp />
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;