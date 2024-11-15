import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"

export const Login = () => {
    
    return (

        <Container>
            <Card>
                <Card.Body>Bienvenido! Inicia Sesion</Card.Body>
                <Row>
                    <Col>
                        <Form.Control/>
                        <Form.Control/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Ingresa</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Olvidaste tu contraseña? recuperala <a>aqui</a>
                    </Col>
                    <Col>
                        Aun no tienes una cuenta? registrate <a>aqui</a>
                    </Col>
                </Row>
            </Card>
        </Container>

    )

}