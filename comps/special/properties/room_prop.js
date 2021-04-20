import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, FormControl, FormControlLabel, Grid, Input, InputAdornment, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { MySelect } from "../../reusables";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import { AddImageView, LocationDiv, SpaceAmenityDiv, SpaceAvailabilityDiv, SpaceChargesDiv } from "./prop_reusable";

function RoomProps(params) {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Banner />
        <RoomDetails />
    </>
}

function Banner() {
    return <>
        <Container style={{ backgroundColor: "#60941a", marginTop: "70px" }} >
            <h3 style={{ textAlign: "center", color: "white", paddingTop: "10px" }} >
                <FontAwesomeIcon icon={faDoorOpen} /> <strong>Room Ads</strong></h3>
            <p style={{ textAlign: "center", color: "white", paddingBottom: "10px" }} >
                Post your room ads for potential tenants</p>
        </Container>
    </>
}

function RoomDetails(params) {
    return <>
        <Container style={{ marginTop: "20px" }}>
            <Container
                style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a", padding: 0 }}>
                <h3 style={{
                    color: "white", backgroundColor: "#60941a",
                    paddingTop: "5px", paddingLeft: "5px"
                }}>Room Detail</h3>
                <AddImageView />
                <RoomForm />
            </Container>
        </Container>
    </>
}

function RoomForm(params) {
    let formik = useFormik({
        initialValues: {
            typeOfHouse: "",
            spaceCat: "",
            spaceCond: "",
            numOfBedroom: 1,
            numBathroom: 1,
            numKitchen: 1,
            numSittingroom: 1,
        },
        validate: (values) => {
            return new Promise(async (res, rej) => {
                let errors = {}
                let valObj = await registerValidator(values)
                let { valid, errorList, instance } = valObj
                if (!valid) {
                    for (const errorObj of errorList) {
                        errors[errorObj.prop] = errorObj.msg;
                    }
                }
                console.log(errors)
                res(errors)
            })
        },
        onSubmit: (values, actions) => {
            (async () => {
                let res = await fetch("/api/rooms", {
                    method: "POST",
                    body: JSON.stringify(values)
                });
                if (res.ok) {
                    let data = await res.json();
                    let { err, user, jwt } = data;
                    if (err) {
                        handleFail(err)
                    }
                    if (user) {
                        handleSuccess(user);
                    }

                }
            })()
        }
    })
    return <>
        <form>
            <Container style={{ marginTop: "20px" }}>
                <HouseType />
                <SpaceCategory />
                <SpaceCondition />
                <Grid spacing={2} container>
                    <Grid item container xs={5}>
                        <BedroomNumber />
                    </Grid>
                    <Grid item container xs={5}>
                        <KitchenNumber />
                    </Grid>
                    <Grid item container xs={5}>
                        <SittingNumber />
                    </Grid>
                    <Grid item container xs={5}><SittingNumber /></Grid>
                </Grid>
                <LocationDiv />
                <SpaceAvailabilityDiv />
                <SpaceAmenityDiv />
                <SpaceChargesDiv />
            </Container>
        </form>
    </>
}

function HouseType(params) {
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

function SpaceCategory(params) {
    let [spaceCategoryState, changeSpaceCategoryState] = useState("")
    return <>
        <MySelect labelTitle="Select category of space" valueProps={spaceCategoryState} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                changeSpaceCategoryState(e.target.value)
            }
        } />
    </>
}

function SpaceCondition(params) {
    let [spaceCategoryState, changeSpaceCategoryState] = useState("")
    return <>
        <MySelect labelTitle="Select category of space" valueProps={spaceCategoryState} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                changeSpaceCategoryState(e.target.value)
            }
        } />
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
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: "5px"
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

function BedroomNumber({ valueProp = 1, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={valueProp}
                name="email"
                className={classes.textField} />
        </FormControl>
    </>
}

function KitchenNumber({ valueProp = 1, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={valueProp}
                name="email"
                className={classes.textField} />
        </FormControl>
    </>
}

function SittingNumber({ valueProp = 1, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={valueProp}
                name="email"
                className={classes.textField} />
        </FormControl>
    </>
}

function BathroomNumber({ valueProp = 1, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={valueProp}
                name="email"
                className={classes.textField} />
        </FormControl>
    </>
}

export { RoomProps }