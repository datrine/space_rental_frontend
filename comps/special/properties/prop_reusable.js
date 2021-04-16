import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Input, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import Image from "next/image";
import React, { useState } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';


function AddImageView(params) {
    return <>
        <Container>
            <Grid justify="center" container >
                <Image width={300} height={300} src="/camera_placeholder.jpg" />
            </Grid>
        </Container>
        <Container style={{ width: 300, marginTop: 20 }} >
            <Grid justify="space-evenly" container >
                <AddBtn />
                <AddBtn />
                <AddBtn />
                <AddBtn />
                <AddBtn />
            </Grid>
        </Container>
    </>
}

function AddBtn(params) {
    return <>
        <button className="w3-btn" style={{
            backgroundColor: "rgba(189, 195, 199, 1)",
        }}>
            <FontAwesomeIcon size="1x" icon={faPlus}
                style={{
                    color: "#60941a",
                }} />
        </button>
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

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MySelect(props = {
    labelTitle: "", valueProps, selectMenuArr, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, selectMenuArr, stylesProps, handleChangeProps } = props
    let classes = useStyles()
    return <>
        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Select
                value={valueProps}
                onChange={handleChangeProps}
                displayEmpty
                className={classes.textField}
                inputProps={{ 'aria-label': 'Without label' }}

                style={stylesProps}

            >
                {selectMenuArr.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>
    </>
}

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {String} props.type
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MyInput(props = {
    labelTitle: "", valueProps, type, selectMenuArr, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, selectMenuArr, stylesProps, type, handleChangeProps } = props
    let classes = useStyles()
    return <>

        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Input onChange={handleChangeProps} value={valueProps}
                name="email" type={type}
                className={classes.textField} />
        </FormControl>
    </>
}

function LocationDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px", }} >
            <h4 className="w3-padding" style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Location</h4>
            <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                <BuildingCity />
                <BuildingArea />
                <BuildingAddress /></Container>
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
        <MyInput labelTitle="Select category of space" valueProps={buildingCityState}
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
        <MyInput labelTitle="Select category of space" valueProps={buildingCityState}
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
        <MyInput labelTitle="Select Date Format" valueProps={dateFormatProps} selectMenuArr={[
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
        <MyInput labelTitle="Type of house" valueProps={houseTypeState} selectMenuArr={[
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
        <MyInput labelTitle="Type of house" valueProps={houseTypeState} selectMenuArr={[
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
            <div>
                <span><Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Shared Living Room</span>
              <span><Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Water</span>  
                <span><Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                  /> Electricity</span>  
                <Checkbox
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
            </div>
        </Container>
    </>
}

export {
    AddImageView, MyInput, MySelect, LocationDiv,
    SpaceAvailabilityDiv, SpaceChargesDiv, SpaceAmenityDiv
}