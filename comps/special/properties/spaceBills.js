import _ from "lodash"
import { DateTime, Interval } from "luxon"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Input, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import React, { useState } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import { MyInput, MySelect } from "../../reusables";
import GenderSelect from "../profile/gender";
import { useEffect } from "react";
import { buildDateInfo, daysSorter, getImgUrl, listOfDatesBetween, maxLengthOfStay, uploader } from "../../../utils/utilFns";
import { nanoid } from 'nanoid'
import { RoomContext } from "./room_prop";
import { useContext } from "react";
import { RangeOfSpace } from "./dateApp";

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 0.5,
        borderBottomStyle: "solid",
        //borderRadius: "5px"
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        //borderRadius: "5px"
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

function SpaceChargesDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space Bills</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a", paddingTop: 20 }}>
                <SpaceCharge />
                <SpaceChargeFormat />
                <OtherBillsCharge />
            </Container>
        </Container>
    </>
}

function SpaceCharge(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceBills = roomData.spaceBills
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Space Charge (₦)<strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let charge = e.target.value
                spaceBills.charge = Number(charge)
                changeRoomContext({ ...roomData, spaceBills })
            }} value={spaceBills.charge}
                placeholder="Space Charge" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function OtherBillsCharge(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceBills = roomData.spaceBills
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Other Bills Charge (₦)<strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let otherBills = e.target.value
                spaceBills.otherBills = Number(otherBills)
                changeRoomContext({ ...roomData, spaceBills })
            }} value={spaceBills.otherBills}
                placeholder="Other Bills Charge (₦)" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function SpaceChargeFormat(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceBills = roomData.spaceBills
    return <> <RoomContext.Provider value={spaceBills} >
        <FormControl fullWidth>
            <h5>Select Payment Format</h5>
            <RadioGroup onChange={e => {
                let billFormat = e.target.value
                spaceBills.billFormat = billFormat
                changeRoomContext({ ...roomData, spaceBills })
            }} value={spaceBills.billFormat} aria-label="Billing Format" name="customized-radios">
                <FormControlLabel value="day" control={<Radio />} label="Day" />
                <FormControlLabel value="week" control={<Radio />} label="Week" />
                <FormControlLabel value="month" control={<Radio />} label="Month" />
            </RadioGroup>
        </FormControl>
    </RoomContext.Provider>
    </>
}



export {
    SpaceChargesDiv,
}