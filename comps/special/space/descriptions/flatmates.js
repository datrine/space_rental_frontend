import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { dateRangeFromDateStrings, listOfDatesBetween } from "../../../../utils/utilFns";
import { SpaceContext } from "../index_desc";
import DayPicker, { DateUtils } from 'react-day-picker';

function Flatmates({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { flatmateInfo } = spaceData
    let [openRoomListDialog, changeRoomListDialog] = useState(false);
    return <>
        <Container style={{ marginTop: "10px" }}  >
            <h3>Sharing With</h3>
            <Grid container >
                <Grid item container xs={2} >
                    <img src="/space_desc/available.svg" />
                </Grid>
                <Grid item container xs={8}>
                    <Button disabled={flatmateInfo.length > 0} variant="contained" color="primary" onClick={
                        e => {
                            changeRoomListDialog(true)
                        }
                    } >Show Flatmate Info</Button>
                </Grid>
            </Grid>
        </Container>
        <FlatmatesView openRoomListDialog={openRoomListDialog}
            hookRoomListDialog={changeRoomListDialog} />
    </>
}

function FlatmatesView({ openRoomListDialog, hookRoomListDialog }) {
    let handleClose = (e) => {
        hookRoomListDialog(false)
    }
    return <>
        <Dialog
            open={openRoomListDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Dates Available</DialogTitle>
            <DialogContent>
                <Container style={{ padding: 0 }} >
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


export { Flatmates }