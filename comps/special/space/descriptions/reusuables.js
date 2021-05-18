import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import { AddShoppingCart, Book, Bookmark, CheckCircleOutline, Favorite, Save } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { appColor } from "../../../../utils/utilFns";
import { SpaceContext, SpaceToBookContext } from "../index_desc";

function FooterMenu({ }) {
    let ctx = useContext(SpaceToBookContext)
    let { spaceToBookData, changeSpaceContext } = ctx
    let { datesToStayInfo } = spaceToBookData;
    let { dateMode, dateRangeStrings, singleDatesStrings } = datesToStayInfo;
    let [clickedBtnState, changeClickedBtnState] = useState("");
    let [modeState, changeModeState] = useState("presave");
    let [openRoomListDialog, changeRoomListDialog] = useState(false);
    let [openSuccessDialog, changeSuccessDialog] = useState(false);
    let [openFailedDialog, changeFailedDialog] = useState(false);
    let handleProceed = async e => {
        try {
            let res = await fetch("/api/orders", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(spaceToBookData)
            });
            let { order } = await res.json()
            console.log(order);
            if (order) {
                changeSuccessDialog(true)
                changeModeState("success")
            }
        } catch (error) {
            console.log(error)
            changeFailedDialog(true)
            changeModeState("fail")
        }
    }
    let handleCancel = async e => {
        changeRoomListDialog(true)
        changeModeState("cancel")
    }
    let summaryView = <><h5>Dates:</h5>
        {dateMode === "asRange" ? <p>
            {dateRangeStrings.from} to {dateRangeStrings.to}
        </p> : <Grid  >{singleDatesStrings.map((dateStr, index) => <p key={index} >
            {dateStr}</p>)}
        </Grid>}</>
    let view = null;
    switch (modeState) {
        case "presave":
            view = null;
            break;
        case "summary":
            view = <Summary openRoomListDialog={openRoomListDialog}
                hookRoomListDialog={changeRoomListDialog} view={summaryView}
                handleProceed={handleProceed} handleCancel={handleCancel} />;
            break;
        case "success":
            view = null;
            break;
        case "cancel":
            view = null;
            break;
        default:
            break;
    }
    return <>
        <Grid container style={{ position: "fixed", height: 50, bottom: 0, backgroundColor: "grey" }} >
            <Grid item container xs={4} >
                <Button>
                    <Bookmark />
                </Button>
            </Grid>
            <Grid item container xs={4} >
                <Button onClick={e => {
                    changeClickedBtnState("save")
                    changeRoomListDialog(true)
                    changeModeState("summary")
                }} style={{
                    color: clickedBtnState === "save" ? appColor : "black",
                    backgroundColor: clickedBtnState === "save" ? "white" : "inherit",
                }} >
                    <AddShoppingCart />
                </Button>
            </Grid>
            <Grid item container xs={4} >
                <Button>
                    <Favorite />
                </Button>
            </Grid>
        </Grid>
        {view}
        <SuccessOrder openDialog={openSuccessDialog} hookChangeSuccessDialog={changeSuccessDialog} />

        <FailOrder openDialog={openFailedDialog} hookChangeFailDialog={changeFailedDialog} />
    </>
}

function Summary({ openRoomListDialog, hookRoomListDialog, view, handleCancel, handleProceed }) {
    return <>
        <Dialog
            open={openRoomListDialog}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Summary</DialogTitle>
            <DialogContent>
                <Container style={{ padding: 0 }}>
                    {view}
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary" >Cancel</Button>
                <Button onClick={handleProceed} color="primary" autoFocus>Proceed</Button>
            </DialogActions>
        </Dialog>
    </>
}

let SuccessOrder = ({ openDialog, hookChangeSuccessDialog }) => {
    let handleClose = (e) => {
        hookChangeSuccessDialog(false)
    }
    return <>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Order Saved</DialogTitle>
            <DialogContent>
                <Container>
                    <h4 style={{ textAlign: "center" }} ><CheckCircleOutline style={{ color: "green" }} /></h4>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

let FailOrder = ({ openDialog, hookChangeFailDialog }) => {
    let handleClose = (e) => {
        hookChangeSuccessDialog(false)
    }
    return <>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User Registration Error</DialogTitle>
            <DialogContent>
                <Container>

                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}
export { FooterMenu }