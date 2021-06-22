import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { appColor, buildDateInfo, dateRangeFromDateStrings, datesFromStrings, dateStringsFromDateRange, daysSorter, listOfDatesBetween, rangeFromDates, stringsFromDates } from "../../../../utils/utilFns";
import { SpaceContext, SpaceToBookContext } from "../index_desc";
import DayPicker, { DateUtils } from 'react-day-picker';
import { MySelect } from "../../../resuables";

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
                        e => {
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
                    <DatesSelectFormat />
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
    let { spaceData } = useContext(SpaceContext)
    let { spaceToBookData, changeContext } = useContext(SpaceToBookContext)
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

    let renterDateRange = renterDateRangeStrings ? dateRangeFromDateStrings(renterDateRangeStrings) : undefined;
    let renterdaysSelected = (datesInfo && dateMode === "asSingles") ?
        datesFromStrings(renterSingleDatesStrings) : (listOfDatesBetween(renterDateRange));

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
            color: appColor,
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
    return (
        <Container>
            <DayPicker modifiers={modifiers} modifiersStyles={modifiersStyles}
                fromMonth={new Date()} selectedDays={daysSelected} onDayClick={
                    (day, { selected, disabled }) => {
                        let days = [...daysSelected]
                        if (disabled) {
                            return
                        }
                        //don't select a past day
                        if (DateUtils.isPastDay(day)) {
                            return
                        }
                        if (dateMode === "asSingles") {
                            if (selected) {
                                let indexOfDate = days.findIndex(dayInArray =>
                                    DateUtils.isSameDay(dayInArray, day))
                                days.splice(indexOfDate, 1)
                                datesToStayInfo = buildDateInfo({
                                    dateMode,
                                    dateRange, singleDatesStrings: stringsFromDates(days)
                                })
                                return changeContext({
                                    ...spaceToBookData,
                                    spaceMeta: { ...spaceToBookData.spaceMeta, datesToStayInfo }
                                })
                            }
                            days.push(day)
                            days.sort(daysSorter)
                            datesToStayInfo = buildDateInfo({
                                dateMode,
                                dateRange, singleDatesStrings: stringsFromDates(days)
                            })
                            changeContext({ ...spaceToBookData, datesToStayInfo })
                        }
                        else if (dateMode === "asRange") {
                            days = []
                            if (DateUtils.isDayBefore(day, dateRange.from)) {
                                dateRange.from = day;
                            }
                            else if (DateUtils.isDayBetween(day, dateRange.from, dateRange.to)) {
                                dateRange.from = day;
                            }
                            else if (DateUtils.isDayAfter(day, dateRange.to)) {
                                dateRange.to = day;
                            }
                            days = listOfDatesBetween(dateRange)
                            datesToStayInfo = buildDateInfo({
                                dateMode,
                                dateRangeStrings: dateStringsFromDateRange(dateRange),
                                singleDatesStrings: daysSelected
                            });
                            changeContext({
                                ...spaceToBookData,
                                spaceMeta: { ...spaceToBookData.spaceMeta, datesToStayInfo }
                            })
                        }
                    }
                } />
        </Container>
    );
}

function DatesSelectFormat({ }) {
    let ctx = useContext(SpaceToBookContext)
    let { spaceToBookData, changeContext } = ctx
    let { datesToStayInfo } = spaceToBookData.spaceMeta
    return <>
        <MySelect labelTitle="Select Date Format"
            valueProps={datesToStayInfo?.dateMode || "asRange"}
            selectMenuArr={[
                { value: "asRange", text: "Select as Range of Dates" },
                { value: "asSingles", text: "Select as Single Dates" },
            ]} handleChangeProps={
                e => {
                    let dateMode = e.target.value
                    datesToStayInfo.dateMode = dateMode
                    let { dateRangeStrings } = datesToStayInfo
                    if (dateMode === "asSingles") {
                        let dateRange = dateRangeFromDateStrings(dateRangeStrings)
                        let listOfDates = listOfDatesBetween(dateRange)
                        let stringsOfDates = stringsFromDates(listOfDates)
                        datesToStayInfo.singleDatesStrings = stringsOfDates
                    }
                    else if (dateMode === "asRange") {
                        let listOfDates = datesFromStrings(datesToStayInfo.singleDatesStrings)
                        let stringsOfDates = rangeFromDates(listOfDates)
                        datesToStayInfo.dateRangeStrings =
                            dateStringsFromDateRange(stringsOfDates)
                    }
                    datesToStayInfo = buildDateInfo(datesToStayInfo)
                    changeContext({
                        ...spaceToBookData,
                        spaceMeta: { ...spaceToBookData.spaceMeta, datesToStayInfo }
                    })
                }
            } />
    </>
}
export { Availability }