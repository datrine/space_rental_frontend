import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { dateRangeFromDateStrings, listOfDatesBetween } from "../../../../utils/utilFns";
import { SpaceContext } from "../index_desc";
import DayPicker, { DateUtils } from 'react-day-picker';

function Availability({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceBills } = spaceData
    let [openRoomListDialog, changeRoomListDialog] = useState(false);
    return <>
        <Container style={{ marginTop: "10px" }}  >
            <Grid container >
                <Grid item container xs={2} >
                    <img src="/space_desc/available.svg" />
                </Grid>
                <Grid item container xs={8}>
                    <Button variant="contained" color="primary" onClick={
                        e=>{
                            changeRoomListDialog(true)
                        }
                    } >Show Dates Available</Button>
                </Grid>
            </Grid>
        </Container>
         <DateAvailableView openRoomListDialog={openRoomListDialog}
            hookRoomListDialog={changeRoomListDialog} />
    </>
}

function DateAvailableView({ openRoomListDialog, hookRoomListDialog }) {
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
                    <Calendar />
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



export function Calendar({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData } = ctx
    let spaceAvailabiltyInfo = spaceData.spaceAvailabiltyInfo
    let datesInfo = spaceAvailabiltyInfo?.datesInfo
    datesInfo.dateMode = datesInfo?.dateMode || "asRange"
    if (datesInfo.dateMode === "asRange") {
        datesInfo.dateRangeStrings = (datesInfo.dateRangeStrings || {
            from: (new Date()).toDateString(),
            to: (new Date()).toDateString(),
        })
    }

    let { dateRangeStrings, singleDatesStrings, dateMode } = datesInfo;
    let dateRange = dateRangeStrings ? dateRangeFromDateStrings(dateRangeStrings) : undefined;
    let daysSelected = (datesInfo && dateMode === "asSingles") ?
        datesFromStrings(singleDatesStrings) : (listOfDatesBetween(dateRange));
    return (
        <Container>
            <DayPicker selectedDays={daysSelected}
                fromMonth={new Date()} />
        </Container>
    );
}

export { Availability }