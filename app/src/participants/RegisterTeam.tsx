import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export const RegisterTeam = () => {
    const [data, setData] = useState({
        name: "",
        id_members: "",
        leader: "",
        round: 0,
        grades: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tempoData: any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    };

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            await axios.post("http://localhost:4000/team/create", data);
            Swal.fire("Equipo registrado con exito", "", "success");
        } catch (error: any) {
            console.log(error)
            Swal.fire("Algo salio mal", error.response.data.msg, "error");
        }
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Registro del Equipo</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre del Equipo</Form.Label>
                            <Form.Control name="name" onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lider del Equipo</Form.Label>
                            <Form.Control name="leader" onChange={onChange} />
                        </Form.Group>
                        <Button onClick={()=>onSubmit()}>Enviar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};