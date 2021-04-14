import { Container, Grid, Button, Paper } from "@material-ui/core";

function PropIndex(params) {
    return <>
    <h2 style={{ textAlign: "center" }}>Create An Ad</h2>
        <Grid direction="column" alignItems="center" justify="space-around" container
            style={{ height: "50vh", width: "100vw",}} >
            <Paper style={{ width: 250, paddingTop: 10 ,paddingBottom:10,backgroundColor:"green" }}>
              <a href="/postads/room"> 
              <h3 style={{ textAlign: "center",color:"white",fontSize:"2em" }} >Room</h3></a> 
            </Paper>
            <Paper style={{ width: 250, paddingTop: 10 ,paddingBottom:10,backgroundColor:"green"}}>
                <h3 style={{ textAlign: "center",color:"white",fontSize:"2em" }} >Office</h3>
            </Paper>
            <Grid item container ></Grid>
        </Grid>

    </>
}

export { PropIndex }