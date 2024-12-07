import axios from "axios";
import { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const Login = () => {
    
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const onChange = (e:any) => {
        e.preventDefault();
        const tempoData : any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            await axios.post("http://localhost:4000/user/login", data)
            Swal.fire("Datos Validados con exito", "", "success")
                .then(()=>navigate("/home"));
        } catch (error:any) {
            Swal.fire("Algo salio mal", error.response.data.msg, "error");
        }
    }

    return (

        <Container className="text-center">
            <Card style={{width:"30rem", margin: "auto"}} className="mt-3">
                <Card.Body>Bienvenido! Inicia Sesion
                <Card.Title className="text-center"></Card.Title>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control className="mb-3" name="email" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" className="mb-3" name="password" onChange={onChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Button onClick={()=>onSubmit()}>Ingresa</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Olvidaste tu contraseña? recuperala <a>aqui</a>
                    </Col>
                    <Col>
                        Aun no tienes una cuenta? registrate <a href="/register">aqui</a>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}