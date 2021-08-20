import { Container } from "@material-ui/core";

function SpacesAdmin({ hookChangeActiveTab }) {
    return <>
        <Container>
            <button onClick={e=>{
                hookChangeActiveTab("create_space");
            }}>Create</button>
        </Container>
    </>
}

export default SpacesAdmin