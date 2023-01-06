import { useEffect, useState } from "react";
import axiosReq from "../../config/axiosReq";


const LoginPage = () => {
    const [users, setUsers] = useState(null);
    const [formValues, setFormvalues] = useState()
    const [loged, setLoged] = useState(false)

    const setValuesForm = (e) => {
        const { value } = e.target

        setFormvalues(value)

    }

    const sendCredentials = async (e) =>{
        e.preventDefault();
        try {
            const result = await axiosReq.post('/login', {email: formValues, password:""})
            localStorage.setItem('token',result.data.access_token)
            setLoged(true)
            console.log('login', result)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        try {
            const result = await axiosReq.get('/test/token')
            console.log(result, 'conectado con token')
            setUsers(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(loged) getUsers()
    },[loged])

    return (<>
        <h1>Login</h1>
        { users && <p>Conectado a la api correctamente</p>}

        <form onSubmit={sendCredentials}>
            <input type="text" id="email" value={formValues} onChange={setValuesForm}></input>
            <button>Enviar</button>
        </form>
    </>)
}

export default LoginPage;