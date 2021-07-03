import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import {
    appColor, buildDateInfo, dateRangeFromDateStrings, datesFromStrings,
    dateStringsFromDateRange, daysSorter, listOfDatesBetween, rangeFromDates,
    stringsFromDates
} from "../../utils/utilFns";
import { ISpaceContext, ISpaceToBookContext } from "./contextInterfaces";
import DayPicker, { DateUtils } from 'react-day-picker';
import { MySelect } from ".";

function MyCalendar({ }) {
    let ctx = useContext(ISpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceBills } = spaceData
    let [openRoomListDialog, changeRoomListDialog] = useState(false);
    return <>
            <Grid item container>
                <Button variant="contained" color="primary" onClick={
                    e => {
                        changeRoomListDialog(true)
                    }
                } >Show Dates Ordered</Button>
            </Grid>
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
            <DialogTitle id="alert-dialog-title">Date(s) Selected</DialogTitle>
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
    let { spaceData } = useContext(ISpaceContext)
    let { spaceToBookData, changeContext } = useContext(ISpaceToBookContext)
    let { spaceAvailabiltyInfo: { datesInfo } } = spaceData
    let { datesToStayInfo } = spaceToBookData.spaceMeta
    datesToStayInfo.dateMode = datesToStayInfo?.dateMode || "asRange"
    if (datesToStayInfo.dateMode === "asRange") {
        datesToStayInfo.dateRangeStrings = (datesToStayInfo.dateRangeStrings || {
            from: (new Date()).toDateString(),
            to: (new Date()).toDateString(),
        })
    }

    let { dateRangeStrings: renterDateRangeStrings, singleDatesStrings: renterSingleDatesStrings,
        dateMode: renterDateMode } = datesInfo;
    let { dateRangeStrings, singleDatesStrings, dateMode } = datesToStayInfo;

    let dateRange = dateRangeStrings ? dateRangeFromDateStrings(dateRangeStrings) : undefined;
    let daysSelected = (dateMode === "asSingles") ?
        datesFromStrings(singleDatesStrings) : (listOfDatesBetween(dateRange));
    const modifiers = {
        renterdaysSelected: renterDateMode === "asRange" ?
            dateRangeFromDateStrings(renterDateRangeStrings) :
            listOfDatesBetween(renterSingleDatesStrings)
    };
    const modifiersStyles = {
        renterdaysSelected: {
            color: "#f00",
            //backgroundColor: '#fffdee',
        },
        daysSelected: {
            color: appColor,
            backgroundColor: '#affd5e',
        },
        outside: {
            backgroundColor: 'white',
        },
    };
    console.log(daysSelected);
    return (
        <Container>
            <DayPicker modifiers={modifiers} modifiersStyles={modifiersStyles}
                fromMonth={new Date()} selectedDays={daysSelected} />
        </Container>
    );
}
export { MyCalendar }