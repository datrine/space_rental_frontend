import { Container, FormControl, makeStyles, TextField } from "@material-ui/core";
import { useContext, } from "react";
import { SpaceContext } from "..";

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

function LocationDiv({ }) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px", }} >
            <h4 className="w3-padding" style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Location</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                <BuildingCity />
                <BuildingArea />
                <BuildingAddress />
            </Container>
        </Container>
    </>
}

function BuildingCity({ }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext);
    let { spaceData, changeSpaceContext } = ctx
    let handleChange = (e) => {
        spaceData.locationInfo.cityOrTown = e.target.value
        changeSpaceContext({ ...spaceData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 20, marginTop: 10 }} >
            <TextField fullWidth multiline={true} onChange={handleChange}
                name="cityOrTown" placeholder="City or town...*"
                className={classes.textArea} />
        </FormControl>
    </>
}

function BuildingArea({ }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext);
    let { spaceData, changeSpaceContext } = ctx
    let handleChange = (e) => {
        spaceData.locationInfo.area = e.target.value
        changeSpaceContext({ ...spaceData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 20 }} >
            <TextField fullWidth multiline={true} onChange={handleChange}
                name="Area" placeholder="Area...*"
                className={classes.textArea} />
        </FormControl>
    </>
}

function BuildingAddress({ }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext);
    let { spaceData, changeSpaceContext } = ctx
    let handleChange = (e) => {
        spaceData.locationInfo.address = e.target.value
        changeSpaceContext({ ...spaceData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 10 }} >
            <TextField fullWidth multiline={true} onChange={handleChange} rows={4}
                name="email" placeholder="Address...*"
                className={classes.textArea} />
        </FormControl>
    </>
}

export { LocationDiv, }