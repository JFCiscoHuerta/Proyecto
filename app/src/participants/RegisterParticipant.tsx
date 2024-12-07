import axios from "axios";
import { useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import Swal from "sweetalert2";
import { IUser } from "../Types";

export const RegisterParticipant = () => {
    
    const [data, setData] = useState<IUser>({
        name: '',
        email: '',
        CURP: "",
        password: "",
        rol: "participant"
    });

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tempoData : any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            data!["rol"] = "participant";
            await axios.post("http://localhost:4000/user/register", data)
            Swal.fire("Datos almacenados con exito", "", "success");
        } catch (error:any) {
            Swal.fire("Algo salio mal", error.response.data.msg, "error");
        }
    }

    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Registro Participante</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CURP</Form.Label>
                            <Form.Control name="CURP" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="password" onChange={onChange}/>
                        </Form.Group>
                        <Button onClick={()=>onSubmit()}>Enviar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}