import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import { AddShoppingCart, Book, Bookmark, CheckCircleOutline, Favorite, Save } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "../../../../pages/_app";
import { appColor } from "../../../../utils/utilFns";
import { AccountView } from "../../../general/comp_acc";
import { SpaceContext, SpaceToBookContext } from "../index_desc";

function FooterMenu({ }) {
    let { query: { id } } = useRouter()
    let { session: { user } } = useContext(UserSessionContext)
    let spaceCtx = useContext(SpaceToBookContext)
    let { spaceToBookData, changeSpaceContext } = spaceCtx
    let { datesToStayInfo } = spaceToBookData.spaceMeta;
    let { dateMode, dateRangeStrings, singleDatesStrings } = datesToStayInfo;
    let [clickedBtnState, changeClickedBtnState] = useState("");
    let [modeState, changeModeState] = useState("presave");
    let [openRoomListDialog, changeRoomListDialog] = useState(false);
    let [openSuccessDialog, changeSuccessDialog] = useState(false);
    let [openFailedDialog, changeFailedDialog] = useState(false);
    let [errMsgState, changeErrMsgState] = useState("");
    let handleProceed = async e => {
        try {
            let res = await fetch("/api/orders", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(spaceToBookData)
            });
            if (!res.ok) {
                throw await res.json()
            }
            let order = await res.json()
            console.log(order);
            if (order) {
                changeSuccessDialog(true)
                changeModeState("success")
            }
        } catch (error) {
            console.log(error)
            changeFailedDialog(true);
            changeModeState("fail");
            if (error.errMsg) {

                changeErrMsgState(error.errMsg)
            }
        }
    }
    let handleCancel = async e => {
        changeRoomListDialog(true)
        changeModeState("cancel")
    }
    let loggedIn = !!user.id;
    let [showAccountApp, toggleShowAccountApp] = useState(false);

    useEffect(() => {
    }, [user.id]);

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
        case "fail":
            view = null;
            break;
        default:
            break;
    }
    return <>
        <Grid container style={{ position: "fixed", height: 50, bottom: 0, backgroundColor: "grey" }} >
            {loggedIn ? <>
                <Grid item container xs={12} >
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
            </> : <>
                <Grid item container xs={12} justify="center" >
                    <button onClick={
                        e => {
                            toggleShowAccountApp(true)
                        }
                    } className=" btn"
                        style={{ color: "white", }} >
                        Click to log in first
                </button>
                </Grid>
            </>}
        </Grid>
        {view}
        <SuccessOrder openDialog={openSuccessDialog} hookChangeSuccessDialog={changeSuccessDialog} />
        <FailOrder openDialog={openFailedDialog}
            hookChangeFailDialog={changeFailedDialog} errMsgProp={errMsgState} />
        {showAccountApp ? <>
            <Grid direction="column" style={{
                width: "100vw", height: "100vh", backgroundColor: "white",
                position: "fixed", top: 0, bottom: 0, zIndex: 500
            }}  >
                <button onClick={
                    e => {
                        toggleShowAccountApp(false)
                    }
                } className="w3-btn" style={{ float: "right" }} >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <AccountView callbackUrl={`/residences/${id}`} />
            </Grid>
        </> : null}
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

let FailOrder = ({ openDialog, hookChangeFailDialog, errMsgProp }) => {
    let handleClose = (e) => {
        hookChangeFailDialog(false)
    }
    return <>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Error Creating Order</DialogTitle>
            <DialogContent>
                <Container>
                    {errMsgProp ? errMsgProp : "Some error arose while creating your order."}
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: "red" }} autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}
export { FooterMenu }