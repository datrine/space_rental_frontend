import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Input, AppBar, Toolbar, Slider, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useContext, useState } from "react";
import { appColor } from "../../utils/utilFns";
import { ItemTemplate, MiniItemTemplate, MySelect } from "../resuables";
import { SearchContext, Search_N_FilterContextProvider } from "../searchNfilter";
import { ISpaceContext } from "../resuables/contextInterfaces";
import { SearchTab } from "../filterApp/tab_of_filter";

export default function SearchApp({ openSearchApp, hookOpenSearchApp }) {
    let handleClose = () => {
        hookOpenSearchApp(false)
    }
    let [contentState, changeContentState] = useState("search")
    let [resultsState, changeResultState] = useState([])
    let contentView = null;
    switch (contentState) {
        case "search":
            contentView = <SearchView hookChangeResultState={changeResultState}
                hookChangeContentState={changeContentState} />
            break;
        case "results":
            contentView = <ResultsView resultsProp={resultsState}
                hookChangeContentState={changeContentState} />
            break;

        default:
            break;
    }
    return <> <Dialog maxWidth="md" fullWidth={true}
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{
            paddingTop: 2, paddingBottom: 2,
            backgroundColor: "#474545"
        }} >
            <Grid container>
                <Grid item container xs={10} >
                    <h3 style={{ color: "white" }} >Search</h3>
                </Grid>
                <Grid item container xs={2} >
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <Cancel style={{ color: "red" }} />
                    </Button>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {contentView}
        </DialogContent>
    </Dialog>

    </>
}

export function SearchView({...props}) {
    let { params, changeParams } = useContext(SearchContext)
    let [paramsState, changeParamsState] = useState(params)
    return <>
        <Search_N_FilterContextProvider ctxValue={paramsState}
            hookChangeCtxValue={changeParamsState} >
                <SearchTab {...props} />
        </Search_N_FilterContextProvider>
    </>
}

function SearchBtnForRent({ hookChangeContentState, hookChangeResultState}) {
    let { params, changeParams } = useContext(SearchContext)
    let [paramsState, changeParamsState] = useState(params)
    return <>
        <p style={{ textAlign: "center" }}>
            <button className="w3-btn" onClick={
                async e => {
                    try {
                        let searchParams = new URLSearchParams(paramsState);
                        console.log(searchParams.toString())
                        let res = await fetch(`api/spaces?${searchParams.toString()}`);
                        if (res.ok) {
                            hookChangeContentState("results");
                            let results = await res.json();
                            console.log(results)
                            hookChangeResultState(results);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
                style={{ color: "white", backgroundColor: appColor }} >Search</button>
        </p>
    </>
}

export function SearchByLocation() {
    let { params, changeParams } = useContext(SearchContext)
    let [paramsState, changeParamsState] = useState(params)
    return <>
        <Container>
            <Input value={paramsState.cityOrTown} onChange={
                e => {
                    changeParamsState({ ...paramsState, cityOrTown: e.target.value })
                }
            } placeholder="City, town or area" fullWidth />
        </Container>
    </>
}

function ResultsView({ hookChangeContentState, resultsProp }) {
    // resultsProp = [...resultsProp, ...resultsProp, ...resultsProp]
    return <>
        <Grid container justify="space-between"  >
            {resultsProp.map((result) => <>
                <ISpaceContext.Provider value={{ spaceData: result }} >
                    <MiniItemTemplate />
                </ISpaceContext.Provider>
                <br />
            </>)}
            {resultsProp.length < 1 ? <p>Search returned no results</p> : null}
        </Grid>
    </>
}

export {SearchBtnForRent }