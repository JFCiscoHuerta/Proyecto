import { Container } from "react-bootstrap"
import { ShowList } from "../components/ShowList"

export const ListEvents = () => {

    return (
        <Container>
            <ShowList entity="event"/>
        </Container>
    )

}