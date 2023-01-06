import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import axiosReq from "../../config/axiosReq";


const NewPage = () => {
    const [users, setUsers] = useState(null);
    const [formValues, setFormvalues] = useState()
    const [loged, setLoged] = useState(false)



    return (
        <Container>
            <Header 
                titulo="New"
            />
        </Container>
    )
}

export default NewPage;