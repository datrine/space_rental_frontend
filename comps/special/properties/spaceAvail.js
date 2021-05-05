import { Container, FormControl, Input, makeStyles, } from "@material-ui/core";
import React, { useState } from "react";
import { MySelect } from "../../reusables";
import { maxLengthOfStay } from "../../../utils/utilFns";
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

function SpaceAvailabilityDiv() {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{
                    backgroundColor: "#60941a",
                    color: "white", marginBottom: 0
                }} >Space Availability</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                <RangeOfSpace />
                <TypeOfStay />
                <LengthOfStay />
            </Container>
        </Container>
    </>
}

function LengthOfStay(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceAvailabiltyInfo = roomData.spaceAvailabiltyInfo
    let classes = useStyles()
    let max = spaceAvailabiltyInfo?.datesInfo && maxLengthOfStay(spaceAvailabiltyInfo?.datesInfo)
    return <>
        <FormControl fullWidth>
            <p>Length Of Stay <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let lengthOfStay = Number(e.target.value) <= max ?
                    Number(e.target.value) : max
                spaceAvailabiltyInfo.lengthOfStay = lengthOfStay
                changeRoomContext({ ...roomData, spaceAvailabiltyInfo })
            }} value={Number(spaceAvailabiltyInfo?.lengthOfStay)}
                placeholder="Length of stay" type="number"
                max={max}
                className={classes.textField} />
        </FormControl>

    </>
}

function TypeOfStay(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceAvailabiltyInfo = roomData.spaceAvailabiltyInfo
    return <>
        <MySelect labelTitle="Type of stay" valueProps={spaceAvailabiltyInfo?.lengthOfStay} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                let typeOfStay = e.target.value
                spaceAvailabiltyInfo.typeOfStay = typeOfStay
                changeRoomContext({ ...roomData, spaceAvailabiltyInfo })
            }
        } />
    </>
}

export {
    SpaceAvailabilityDiv,
}