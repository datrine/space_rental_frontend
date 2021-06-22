import {
    Container, Dialog, DialogActions, DialogContent, DialogTitle,
    Button, Grid,
} from "@material-ui/core";
import { ArrowLeftRounded, ArrowRightRounded, Cancel } from "@material-ui/icons";
import { createContext, useContext, useEffect, useState } from "react";
import View from "../view";
import SliderComp from "../resuables/sliderComp";
import { SearchContext, } from "../searchNfilter";
export default function MobileFilter({ SrchCtx, openSearchApp, hookOpenFilterApp }) {
    console.log(hookOpenFilterApp)
    return <>
        <View
            mobileView={<MobileView openSearchApp={openSearchApp}
                hookOpenFilterApp={hookOpenFilterApp} />} />
    </>
}

function MobileView({ openSearchApp, hookOpenFilterApp }) {
    console.log("openSearchApp " + openSearchApp)
    let handleClose = () => {
        console.log("openSearchApp " + openSearchApp)
        hookOpenFilterApp(false)
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
            <Grid style={{}} >
                <Grid item container xs={10} ><h3 style={{ color: "white" }} >Search</h3> </Grid>
                <Grid item container xs={2} >
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <Cancel style={{ color: "red" }} />
                    </Button></Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <SliderComp />
        </DialogContent>
    </Dialog>

    </>
}