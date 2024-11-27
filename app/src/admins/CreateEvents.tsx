import axios from "axios";
import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

interface Metrica {
    description: string,
    max_points: number
}

export const CreateEvent = () => {
    const [event, setEvent] = useState({
        name: "",
        max_round: "",
        metrics: [] as Metrica[],
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value});
    }

    //const nuevaMetrica = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaMetrica = (id: number, e: any) => {
        const { name, value } = e.target;
        const metricasModif = [...event.metrics];
        //metricasModif[id+1] = { ...metricasModif[id], [name]: value };
        metricasModif[id] = { ...metricasModif[id], [name]: value };
        setEvent({ ...event, metrics: metricasModif });
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Actualizando datos");
            Swal.showLoading();
            await axios.post("http://localhost:4000/event/create", event)
            Swal.fire("Datos almacenados con exito", "", "success");
        } catch (error: any) {
            Swal.fire("Algo salio mal", error.response)
        }
    }

    const agregarMetrica = () => {
        setEvent({ ...event, metrics: 
            [...event.metrics, { 
                description: "",
                max_points: 0 
            }] });
      };
    
    const removerMetrica = (id: number) => {
        const removedMetrics = event.metrics.filter((_, i) => i !== id);
        setEvent({ ...event, metrics: removedMetrics });
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Registrar Evento</Card.Title>

                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Titulo del evento:</Form.Label>
                                    <Form.Control name="name" onChange={onChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Numero maximo de rondas:</Form.Label>
                                    <Form.Control name="max_rounds" onChange={onChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>Metricas:</p>
                                {event.metrics.map((metrica, id) => (
                                    <Row key={id}>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Descripcion:</Form.Label>
                                                <Form.Control onChange={(evento) => nuevaMetrica(id, evento)} name="description" value={metrica.description}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Puntos maximos:</Form.Label>
                                                <Form.Control onChange={(evento) => nuevaMetrica(id, evento)} name="max_points" type="number" value={metrica.max_points}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Button onClick={() => removerMetrica(id)}>
                                                Eliminar
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button onClick={agregarMetrica}>
                                    Agregar Métrica
                                </Button>
                            </Col>
                        </Row>
                        <Button onClick={() => onSubmit()}>Crear Evento</Button>
                    </Form>

                </Card.Body>

            </Card>
        </Container>
    );

}