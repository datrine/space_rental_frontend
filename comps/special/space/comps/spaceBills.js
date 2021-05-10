import {  Container, FormControl, FormControlLabel, Input, makeStyles, Radio, RadioGroup, } from "@material-ui/core";
import React, { useState } from "react";
import { SpaceContext } from "..";
import { useContext } from "react";

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
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceBills = spaceData.spaceBills
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Space Charge (₦)<strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let charge = e.target.value
                spaceBills.charge = Number(charge)
                changeSpaceContext({ ...spaceData, spaceBills })
            }} value={spaceBills.charge||""}
                placeholder="Space Charge" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function OtherBillsCharge(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceBills = spaceData.spaceBills
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Other Bills Charge (₦)<strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let otherBills = e.target.value
                spaceBills.otherBills = Number(otherBills)
                changeSpaceContext({ ...spaceData, spaceBills })
            }} value={spaceBills.otherBills||""}
                placeholder="Other Bills Charge (₦)" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function SpaceChargeFormat(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceBills = spaceData.spaceBills
    return <> <SpaceContext.Provider value={spaceBills} >
        <FormControl fullWidth>
            <h5>Select Payment Format</h5>
            <RadioGroup onChange={e => {
                let billFormat = e.target.value
                spaceBills.billFormat = billFormat
                changeSpaceContext({ ...spaceData, spaceBills })
            }} value={spaceBills.billFormat} aria-label="Billing Format" name="customized-radios">
                <FormControlLabel value="day" control={<Radio />} label="Day" />
                <FormControlLabel value="week" control={<Radio />} label="Week" />
                <FormControlLabel value="month" control={<Radio />} label="Month" />
            </RadioGroup>
        </FormControl>
    </SpaceContext.Provider>
    </>
}

export {SpaceChargesDiv,}