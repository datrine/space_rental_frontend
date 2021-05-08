import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Input, AppBar, Toolbar } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useState } from "react";
import { MySelect } from "./reusables";

export default function SearchApp({ openSearchApp, hookOpenSearchApp }) {
    let handleClose = () => {
        console.log("jkkj")
        hookOpenSearchApp(false)
    }
    return <> <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ paddingTop: 2, paddingBottom: 2, backgroundColor: "black" }} >
            <Grid container style={{}} >
                <Grid item container xs={10} ><h3 style={{ color: "white" }} >Search</h3> </Grid>
                <Grid item container xs={2} >
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <Cancel style={{ color: "red" }} />
                    </Button></Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <Container style={{ padding: 0 }} >
                <BtnsToggle />
                <Input placeholder="City, town or area" fullWidth />
                <Categories/>
            </Container>
        </DialogContent>
    </Dialog>

    </>
}

function BtnsToggle(params) {
    let [currentBtnIndex, changeCurrentBtnIndex] = useState(0)
    return <>
        <AppBar position="static" >
            <Toolbar>
                <Button style={{
                    backgroundColor:currentBtnIndex===0?"white":"inherit",
                    color:currentBtnIndex===0?"blue":"inherit"}} onClick={
                    e => {
                        changeCurrentBtnIndex(0)
                    }
                } >Rent</Button>
                <Button style={{
                    backgroundColor:currentBtnIndex===1?"white":"inherit",
                    color:currentBtnIndex===1?"blue":"inherit"}}  onClick={
                    e => {
                        changeCurrentBtnIndex(1)
                    }
                } >Buy</Button>
                <Button style={{
                    backgroundColor:currentBtnIndex===2?"white":"inherit",
                    color:currentBtnIndex===2?"blue":"inherit"}}  onClick={
                    e => {
                        changeCurrentBtnIndex(2)
                    }
                } >Invest</Button>
            </Toolbar>
        </AppBar>
    </>
}

function Categories(params) {
    return <>
        <MySelect labelTitle="Type of stay" valueProps={"apartment"} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                let typeOfStay = e.target.value
            }
        } />
    </>
}