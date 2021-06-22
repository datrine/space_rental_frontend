import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Input, AppBar, Toolbar, Slider, Typography } from "@material-ui/core";
import {  Cancel } from "@material-ui/icons";
import { useContext,  useState } from "react";
import { appColor } from "../../utils/utilFns";
import { MySelect ,SliderComp} from "../resuables";
import { SearchContext, Search_N_FilterContextProvider } from "../searchNfilter";
export default function SearchApp({ openSearchApp, hookOpenSearchApp }) {
    let handleClose = () => {
        hookOpenSearchApp(false)
    }
    let [contentState, changeContentState] = useState("search")
    let contentView = null;
    switch (contentState) {
        case "search":
            contentView = <SearchView hookChangeContentState={changeContentState} />
            break;
        case "results":
            contentView = <ResultsView hookChangeContentState={changeContentState} />
            break;

        default:
            break;
    }
    return <> <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{
            paddingTop: 2, paddingBottom: 2,
            backgroundColor: "#474545"
        }} >
            <Grid container style={{}} >
                <Grid item container xs={10} ><h3 style={{ color: "white" }} >Search</h3> </Grid>
                <Grid item container xs={2} >
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <Cancel style={{ color: "red" }} />
                    </Button></Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {contentView}
        </DialogContent>
    </Dialog>

    </>
}

function BtnsToggle(params) {
    let [currentBtnIndex, changeCurrentBtnIndex] = useState(0)
    return <>
        <Grid container justify="space-between" style={{ backgroundColor: "#E0DEDE" }} >
            <Button style={{
                backgroundColor: currentBtnIndex === 0 ? appColor : "inherit",
                color: currentBtnIndex === 0 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(0)
                }
            } >Rent</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 1 ? appColor : "inherit",
                color: currentBtnIndex === 1 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(1)
                }
            } >Buy</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 2 ? appColor : "inherit",
                color: currentBtnIndex === 2 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(2)
                }
            } >Invest</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 3 ? appColor : "inherit",
                color: currentBtnIndex === 3 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(3)
                }
            } >Flatmate</Button>

        </Grid>
    </>
}

function Categories() {
    let { params, changeParams } = useContext(SearchContext)
    console.log(params)
    return <>
        <MySelect labelTitle="Type of Space" valueProps={params.typeOfSpace || "office"}
            selectMenuArr={[
                { value: "residence", text: "Residence" },
                { value: "office", text: "Office" },
            ]} handleChangeProps={
                e => {
                    params.typeOfSpace = e.target.value;
                    changeParams({ ...params });
                }
            } />
    </>
}

function SearchView({ hookChangeContentState }) {
    let { params, changeParams } = useContext(SearchContext)
    let [paramsState, changeParamsState] = useState(params)
    return <>
        <Search_N_FilterContextProvider ctxValue={paramsState}
            hookChangeCtxValue={changeParamsState} >
            <Container style={{ padding: 0 }} >
                <BtnsToggle />
                <br />
                <Container>
                    <Input value={paramsState.cityOrTown} onChange={
                        e => {
                            changeParamsState({ ...paramsState, cityOrTown: e.target.value })
                        }
                    } placeholder="City, town or area" fullWidth />
                </Container>
                <br />
                <Container>
                    <Categories />
                </Container>
                <br />
                <SliderComp />
                <p style={{ textAlign: "center" }}>
                    <button className="w3-btn" onClick={
                        async e => {
                            try {

                                let searchParams = new URLSearchParams(paramsState);
                                console.log(searchParams.toString())
                                let res = await fetch(`api/search/space?${searchParams.toString()}`);
                                if (res.ok) {

                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    }
                        style={{ color: "white", backgroundColor: appColor }} >Search</button>
                </p>
            </Container>
        </Search_N_FilterContextProvider>
    </>
}

function ResultsView({ hookChangeContentState }) {
    return <>
        <Container>

        </Container>
    </>
}