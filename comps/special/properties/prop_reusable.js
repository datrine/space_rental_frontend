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
import { getImgUrl, uploader } from "../../../utils/utilFns";
import { nanoid } from 'nanoid'

function AddImageView({urlsProps=[]}) {
    let [urlsState, changeUrlsState] = useState(urlsProps)
    return <>
        <Container>
            <Grid justify="center" container >
                {urlsState.length > 0 ? <Caroo imgObjUrls={urlsState} /> :
                    <Image width={300} height={300} src="/camera_placeholder.jpg" />}
            </Grid>
        </Container>
        <Container style={{ width: 300, marginTop: 20 }} >
            <Grid justify="space-evenly" container >
                <AddBtn changeImgUrlObj={changeUrlsState} index={0} urls={urlsState} />
                <AddBtn changeImgUrlObj={changeUrlsState} index={1} urls={urlsState} />
                <AddBtn changeImgUrlObj={changeUrlsState} index={2} urls={urlsState} />
                <AddBtn changeImgUrlObj={changeUrlsState} index={3} urls={urlsState} />
                <AddBtn changeImgUrlObj={changeUrlsState} index={4} urls={urlsState} />
            </Grid>
        </Container>
    </>
}

function Caroo({ imgObjUrls = [] }) {
    return <>
        <Carousel>
            {imgObjUrls.map((imgObj, index) => imgObj ? <Carousel.Item key={index} >
                <img width={300} height={300} src={getImgUrl(imgObj)} />
            </Carousel.Item> : null)}
        </Carousel>
    </>
}

function AddBtn({ changeImgUrlObj, index, urls }) {
    let [isPic, changeIsPic] = useState(urls[index] ? true : false)
    return <>
        <label className="w3-btn" style={{
            backgroundColor: isPic ? "#60941a" : "rgba(189, 195, 199, 1)",
        }}>
            <Input type="file" onChange={
                async e => {
                    try {
                        let files = e.target.files
                        let { data: dataUploaded, err } = await uploader({
                            files,
                            ref: "file",
                            refId: index,
                            field: "room_pics",
                            source: "upload",
                        })
                        if (dataUploaded) {
                            urls[index] = dataUploaded[0]
                            changeIsPic(true)
                            changeImgUrlObj([...urls])
                        }

                    } catch (error) {
                        console.log(error)
                    }
                }
            } style={{ display: "none" }} />
            <span>
                <FontAwesomeIcon size="1x" icon={faPlus}
                    style={{
                        color: isPic ? "white" : "#60941a",
                    }} />
            </span>
        </label>
    </>
}

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

function LocationDiv({ }) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px", }} >
            <h4 className="w3-padding" style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Location</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                <BuildingCity />
                <BuildingArea />
                <BuildingAddress />
            </Container>
        </Container>
    </>
}

function BuildingAddress({ handleChange, valueProp }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <TextField fullWidth multiline={true} onChange={handleChange} value={valueProp}
                name="email" placeholder="Address...*"
                className={classes.textArea} />
        </FormControl>
    </>
}

function BuildingCity({ handleChange, valueProp }) {
    let [buildingCityState, changeCityBuildingState] = useState("")
    return <>
        <MySelect labelTitle="Select category of space" valueProps={buildingCityState}
            selectMenuArr={[
                { value: "apartment", text: "Apartment" },
                { value: "flat", text: "Flats" },
            ]} handleChangeProps={
                e => {
                    changeCityBuildingState(e.target.value)
                }
            } />
    </>
}

function BuildingArea({ handleChange, valueProp }) {
    let [buildingCityState, changeCityBuildingState] = useState("")
    return <>
        <MySelect labelTitle="Select category of space" valueProps={buildingCityState}
            selectMenuArr={[
                { value: "apartment", text: "Apartment" },
                { value: "flat", text: "Flats" },
            ]} handleChangeProps={
                e => {
                    changeCityBuildingState(e.target.value)
                }
            } />
    </>
}

function SpaceAvailabilityDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding" style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                <RangeOfSpace />
                <TimeOfStay />
                <LengthOfStay />
            </Container>
        </Container>
    </>
}

function RangeOfSpace({ handleSelect, valueProp }) {
    let highlighted = {
        to: new Date(),
        from: new Date()
    }
    let [dateFormatState, changeDateFormatState] = useState("asRange")
    let daysSelected = dateFormatState ? [new Date()] : highlighted
    let [daysSelectedState, changeDaysSelected] = useState({ daysSelected })
    return (
        <Container>
            <DatesSelectFormat dateFormatProps={dateFormatState}
                changeDateFormatProps={changeDateFormatState} />
            <DayPicker onDayClick={
                (day, { selected, disabled }) => {
                    let days = daysSelectedState.daysSelected
                    if (disabled) {
                        return
                    }
                    if (selected) {
                        let indexOfDate = days.findIndex(dayInArray =>
                            DateUtils.isSameDay(dayInArray, day))
                        days.splice(indexOfDate, 1)
                        return changeDaysSelected({ daysSelected: days })
                    }
                    //don't select a past day
                    if (DateUtils.isPastDay(day)) {
                        return
                    }
                    days.push(day)
                    days.sort((dayToSortA, dayToSortB) => {
                        if (DateUtils.isDayBefore(dayToSortA, dayToSortB)) {
                            return -1
                        }
                        else if (DateUtils.isSameDay(dayToSortA, dayToSortB)) {
                            return 0
                        }
                        else if (DateUtils.isDayAfter(dayToSortA, dayToSortB)) {
                            return 1
                        }
                    })
                    changeDaysSelected({ daysSelected: days })
                }
            } selectedDays={daysSelectedState.daysSelected} fromMonth={new Date()} />
        </Container>
    );
}

function DatesSelectFormat({ dateFormatProps, changeDateFormatProps }) {
    return <>
        <MySelect labelTitle="Select Date Format" valueProps={dateFormatProps} selectMenuArr={[
            { value: "asRange", text: "Select as Range of Dates" },
            { value: "asSingle", text: "Select as Single Date" },
        ]} handleChangeProps={
            e => {
                changeDateFormatProps(e.target.value)
            }
        } />
    </>
}

function LengthOfStay(params) {
    let [houseTypeState, changeHouseTypeState] = useState("")
    return <>
        <MySelect labelTitle="Type of house" valueProps={houseTypeState} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                changeHouseTypeState(e.target.value)
            }
        } />
    </>
}

function TimeOfStay(params) {
    let [houseTypeState, changeHouseTypeState] = useState("")
    return <>
        <MySelect labelTitle="Type of house" valueProps={houseTypeState} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                changeHouseTypeState(e.target.value)
            }
        } />
    </>
}

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
    return <>
        <MyInput type="number" labelTitle="Space Charge (₦)" />
    </>
}

function OtherBillsCharge(params) {
    return <>
        <MyInput type="number" labelTitle="Other Bills Charge (₦)" />
    </>
}

function SpaceChargeFormat(params) {
    return <>
        <Container>
            <h5>Select Payment Format</h5>
            <RadioGroup defaultValue="day" aria-label="Billing Format" name="customized-radios">
                <FormControlLabel value="day" control={<Radio />} label="Day" />
                <FormControlLabel value="week" control={<Radio />} label="Week" />
                <FormControlLabel value="month" control={<Radio />} label="Month" />
            </RadioGroup>
        </Container>
    </>
}

function SpaceAmenityDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space Amenities</h4>
            <Container style={{
                borderWidth: 1, borderStyle: "solid", borderColor: "#60941a",
                paddingTop: 20
            }}>
                <SpaceAmenities />
            </Container>
        </Container>
    </>
}

function SpaceAmenities(params) {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return <>
        <Container>
            <h5>Select Amenity</h5>
            <Grid container >
                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Shared Living Room</Grid>

                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Shared Living Room</Grid>


                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Running Water</Grid>

                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Shared Living Room</Grid>
            </Grid>
        </Container>
    </>
}

function FlatmateDiv(params) {
    let flatmates = [{ name: "" }]
    let [flatmatesState, changeFlatmateState] = useState(flatmates)
    return <>
        <Container style={{ padding: 0, marginTop: "20px", }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Flatmate(s) Details</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                {flatmatesState.map(({ }, index) => <Flatmate key={index} />)}
                <p style={{ marginTop: "10px" }}>
                    <Button onClick={
                        e => {
                            let fms = [...flatmates]
                            let obj = { name: "", date: Date.now() }
                            fms.push(obj)
                            console.log(fms)
                            changeFlatmateState([...fms])
                        }
                    } style={{ backgroundColor: "#60941a" }}>Add Flatmate</Button></p>
            </Container>
        </Container>
    </>
}

function Flatmate(params) {
    return <>
        <Container style={{ borderStyle: "solid", borderWidth: 1, borderColor: "#60941a", marginTop: 10 }} >
            <MyInput placeholder="Flatmate name" />
            <MyInput placeholder="Flatmate Occupation" />
            <GenderSelect />
        </Container>
    </>
}

function SpaceRulesDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space Rules</h4>
            <Container style={{
                borderWidth: 1, borderStyle: "solid", borderColor: "#60941a",
                paddingTop: 20
            }}>
                <SpaceRules />
            </Container>
        </Container>
    </>
}

function SpaceRules(params) {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return <>
        <Container>
            <h5>Select Amenity</h5>
            <Grid container >
                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Smoking allowed</Grid>

                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />Pet allowed</Grid>


                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />Referee required</Grid>

                <Grid item container xs={6}><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Couple accepted</Grid>
            </Grid>
        </Container>
    </>
}

export {
    AddImageView, LocationDiv,
    SpaceAvailabilityDiv, SpaceChargesDiv, SpaceAmenityDiv, FlatmateDiv, SpaceRulesDiv
}