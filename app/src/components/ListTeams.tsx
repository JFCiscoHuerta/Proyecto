import { Container } from "react-bootstrap"
import { ShowList } from "../components/ShowList"

export const ListTeams = () => {

    return (
        <Container>
            <ShowList entity="team"/>
        </Container>
    )

}