import { Container } from "react-bootstrap"
import { ShowList } from "../components/ShowList"

export const ListUsers = () => {

    return (
        <Container>
            <ShowList entity="user"/>
        </Container>
    )

}