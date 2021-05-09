import _ from "lodash"
import { Container, } from "@material-ui/core";
import React, { useState } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import { useEffect } from "react";
import {
    buildDateInfo, datesFromStrings, daysSorter, listOfDatesBetween,
    stringsFromDates, rangeFromDates
} from "../../../../utils/utilFns";
import { SpaceContext } from "..";
import { useContext } from "react";
import { MySelect } from "../../../reusables";

export function RangeOfSpace({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceAvailabiltyInfo = spaceData.spaceAvailabiltyInfo
    let datesInfo = spaceAvailabiltyInfo?.datesInfo
    let dateMode = datesInfo?.dateMode || "asRange"
    let dateRange = (datesInfo && dateMode === "asRange") ? (datesInfo.dateRange || {
        from: new Date(),
        to: new Date(),
    }) : {
        from: new Date(),
        to: new Date(),
    }
    let daysSelected = (datesInfo && dateMode === "asSingles") ?
        datesFromStrings(datesInfo.singleDatesStrings) : listOfDatesBetween(dateRange)
    let [dateModeState, changeDateModeState] = useState(dateMode)

    return (
        <Container>
            <DatesSelectFormat />
            <DayPicker onDayClick={
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
                            spaceAvailabiltyInfo.datesInfo = buildDateInfo({
                                dateMode,
                                dateRange, singleDatesStrings: days
                            })
                            return changeSpaceContext({ ...spaceData, spaceAvailabiltyInfo })
                        }
                        days.push(day)
                        days.sort(daysSorter)
                        spaceAvailabiltyInfo.datesInfo = buildDateInfo({
                            dateMode,
                            dateRange, singleDatesStrings: days
                        })
                        changeSpaceContext({ ...spaceData, spaceAvailabiltyInfo })
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
                        spaceAvailabiltyInfo.datesInfo = buildDateInfo({
                            dateMode,
                            dateRange, singleDatesStrings: daysSelected
                        })
                        changeSpaceContext({ ...spaceData, spaceAvailabiltyInfo })
                    }
                }
            } selectedDays={daysSelected}
                fromMonth={new Date()} />
        </Container>
    );
}

function DatesSelectFormat({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceAvailabiltyInfo = spaceData.spaceAvailabiltyInfo
    return <>
        <MySelect labelTitle="Select Date Format"
            valueProps={spaceAvailabiltyInfo?.datesInfo?.dateMode || "asRange"}
            selectMenuArr={[
                { value: "asRange", text: "Select as Range of Dates" },
                { value: "asSingles", text: "Select as Single Dates" },
            ]} handleChangeProps={
                e => {
                    let dateMode = e.target.value
                    spaceAvailabiltyInfo.datesInfo.dateMode = dateMode
                    if (dateMode === "asSingles") {
                        let listOfDates = listOfDatesBetween(spaceAvailabiltyInfo.datesInfo.
                            dateRange)
                        let stringsOfDates = stringsFromDates(listOfDates)
                        spaceAvailabiltyInfo.datesInfo.singleDatesStrings = stringsOfDates
                    }
                    else if (dateMode === "asRange") {
                        let listOfDates = datesFromStrings(spaceAvailabiltyInfo.datesInfo.
                            singleDatesStrings)
                        let stringsOfDates = rangeFromDates(listOfDates)
                        spaceAvailabiltyInfo.datesInfo.dateRange = stringsOfDates
                    }
                    spaceAvailabiltyInfo.datesInfo =
                        buildDateInfo(spaceAvailabiltyInfo.datesInfo)
                    changeSpaceContext({ ...spaceData, spaceAvailabiltyInfo })
                }
            } />
    </>
}
