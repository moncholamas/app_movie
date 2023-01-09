import { Container, Spinner } from "react-bootstrap";

const Loading = ({ texto }) => {

    return (
        <Container style={{disply:'flex', margin:'20px', padding:'40px'}}>
            <Spinner
                as="span"
                animation="border"
                size="xl"
                role="status"
                aria-hidden="true"
            />
            <h4>{texto}</h4>
        </Container>
    )
}

export default Loading;