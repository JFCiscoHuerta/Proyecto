import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { IEvent, ITeams, IUser } from "../Types";
import { Card, Table } from "react-bootstrap";

interface props {
    entity: "user" | "team" | "event"
}

//Listado de usuarios
export const ShowList = ({ entity }: props) => {
    const [data, setData] = useState([]);

    //Cada que se mande a llamar
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const url = `http://localhost:4000/${entity}/list`;
            const { data } = await axios.get(url);
            //data
            setData(data);
        } catch (error) {
            Swal.fire("Oops, ocurrio un error", "No se puedieron obtener los datos de la tabla", "error");
        }
    }

    const getColumns = () => {
        const userColumns = ["Nombre", "Correo", "CURP", "Rol"];
        const eventColumns = ["Nombre del Evento", "Cantidad de Rondas"];
        const teamColumns = ["Nombre del Equipo", "Nombre del Lider"];

        let columns: any[] = [];
        if (entity == "event") {
            columns = eventColumns;
        } else if (entity == "team") {
            columns = teamColumns;
        } else if (entity == "user") {
            columns = userColumns;
        };
        const HTMLColumns = columns.map((c) => (
            <th>{c}</th>
        ))
        return HTMLColumns;
    }

    const getName = () => {
        let name = "";
        if (entity == "event") {
            name = "Listado de Eventos";
        } else if (entity == "team") {
            name = "Listado de Equipos";
        } else if (entity == "user") {
            name = "Listado de Usuarios";
        };
        return name;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Listado de {getName()}</Card.Title>
                <Table>
                    <thead>
                        {getColumns()}
                    </thead>
                    <tbody>
                        {
                            entity == "event" && (
                                data.map((event: IEvent) => (
                                    <tr>
                                        <td>{event.name}</td>
                                        <td>{event.max_round}</td>                                        
                                    </tr>
                                ))
                            ) ||
                            entity == "team" && (
                                data.map((team: ITeams) => (
                                    <tr>
                                        <td>{team.name}</td>
                                        <td>{team.leader}</td>                                        
                                    </tr>
                                ))
                            ) ||
                            entity == "user" && (
                                data.map((user: IUser) => (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>   
                                        <td>{user.CURP}</td> 
                                        <td>{user.rol}</td> 
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </Table>
            </Card.Body>

        </Card>
    )
}