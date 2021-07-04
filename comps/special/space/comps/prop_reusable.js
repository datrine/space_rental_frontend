import { SpaceAvailabilityDiv } from './spaceAvail';
import { AddImageView } from './space_pics';
import { FlatmateDiv } from './flatmates';
import { SpaceChargesDiv } from './spaceBills';
import { SpaceAmenityDiv } from './spaceAmenities';
import { LocationDiv } from './spaceLocation';
import { SpaceRulesDiv } from './spaceRules';
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Input,
    makeStyles, MenuItem, Select, TextField
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { MySelect, } from "../../../resuables/index";
import { spaceDataDefault } from "../index_create";
import { getSession, signIn } from "next-auth/client";
import { SpaceContext } from "../../../resuables/contextInterfaces"


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
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));


function NameOfSpace({ }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext);
    let { spaceData, changeSpaceContext } = ctx
    let handleChange = (e) => {
        spaceData.nameOfSpace = e.target.value
        changeSpaceContext({ ...spaceData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 20, marginTop: 10 }} >
            <TextField value={spaceData.nameOfSpace || ""} fullWidth multiline={true} onChange={handleChange}
                name="name" placeholder="Name the space"
                className={classes.textField} />
        </FormControl>
    </>
}

function DescOfSpace({ }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext);
    let { spaceData, changeSpaceContext } = ctx
    let handleChange = (e) => {
        spaceData.descOfSpace = e.target.value
        changeSpaceContext({ ...spaceData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 20, marginTop: 10 }} >
            <TextField value={spaceData.descOfSpace || ""} fullWidth multiline={true} onChange={handleChange} rows={4}
                name="name" placeholder="Describe the space"
                className={classes.textField} />
        </FormControl>
    </>
}

function TypeOfStay(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    return <>
        <MySelect labelTitle="Select Type of Space" valueProps={spaceData.typeOfSpace}
            selectMenuArr={[
                { value: "residence", text: "Residential Space" },
                { value: "office", text: "Office" },
            ]} handleChangeProps={
                e => {
                    let newValue = e.target.value
                    spaceData.typeOfSpace = newValue
                    changeSpaceContext({ ...spaceData })
                }
            } />
    </>
}

function SpaceCategory(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceInfo = spaceData.spaceInfo
    let selectValue = apartments[spaceData.typeOfSpace || "residence"]
    return <>
        <MySelect labelTitle={`Select category of ${spaceData.typeOfSpace} space`} valueProps={spaceInfo.spaceCategory}
            selectMenuArr={selectValue} handleChangeProps={
                e => {
                    let newValue = e.target.value
                    spaceInfo.spaceCategory = newValue
                    changeSpaceContext({ ...spaceData, spaceInfo })
                }
            } />
    </>
}

function SpaceCondition(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceInfo } = spaceData
    return <>
        <MySelect labelTitle="Select condition of space"
            valueProps={spaceInfo.spaceCondition} selectMenuArr={[
                { value: "new", text: "New" },
                { value: "furnished", text: "Furnished" },
            ]} handleChangeProps={
                e => {
                    let houseType = e.target.value
                    spaceInfo.spaceCondition = houseType
                    changeSpaceContext({ ...spaceData, spaceInfo })
                }
            } />
    </>
}

function BedroomNumber({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceInfo } = spaceData
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let bedroomNumber = e.target.value
                spaceInfo.bedroomNumber = bedroomNumber
                changeSpaceContext({ ...spaceData, spaceInfo })
            }} value={spaceInfo.bedroomNumber}
                placeholder="No of bedroom" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function KitchenNumber({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceInfo = spaceData.spaceInfo
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>kitchens <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let kitchenNumber = e.target.value
                spaceInfo.kitchenNumber = kitchenNumber
                changeSpaceContext({ ...spaceData, spaceInfo })
            }} value={spaceInfo.kitchenNumber}
                placeholder="No of kitchen" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function SittingNumber({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let spaceInfo = spaceData.spaceInfo
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Parlour <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let sittingNumber = e.target.value
                spaceInfo.sittingNumber = sittingNumber
                changeSpaceContext({ ...spaceData, spaceInfo })
            }} value={spaceInfo.sittingNumber}
                placeholder="No of parlour" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function BathroomNumber({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceInfo } = spaceData
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Bathrooms <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let bathroomNumber = e.target.value
                spaceInfo.bathroomNumber = bathroomNumber
                changeSpaceContext({ ...spaceData, spaceInfo })
            }} value={spaceInfo.bathroomNumber}
                placeholder="No of bathroom" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

let SuccessSavedRoom = ({ openDialog, hookChangeResponseView ,textToShow}) => {
    let [open, setOpen] = useState(openDialog);
    textToShow=textToShow||"A Room Ad Has Been Successfully Added"
    let ctx = useContext(SpaceContext)
    let handleClose = (e) => {
       // ctx.changeSpaceContext({ ...spaceDataDefault })
        hookChangeResponseView(null)
    }
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Room Ad Success</DialogTitle>
            <DialogContent>
                <Container >
                    <h3 style={{ textAlign: "center" }} >Successful!</h3>
                    <h3 style={{ textAlign: "center" }} >
                        <CheckCircle fontSize="large" style={{ color: "green" }} />
                    </h3>
                    <h4 style={{ textAlign: "center" }}>{textToShow}</h4>
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

let FailSavedRoom = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(openDialog)
    let handleClose = (e) => hookChangeResponseView(null)
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Room Ad Creation Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Unable to create room. Please reload page.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}




let officeTypes = [
    { value: "trad_space", text: "Traditional Office Space" },
    { value: "co_work", text: "Co-working Space" },
    { value: "private", text: "Private Office" },
    { value: "enterprise_suite", text: "Executive/Enterprise Suite" },
]

let residenceTypes = [
    { value: "bungalow", text: "Bungalow" },
    { value: "duplex", text: "Duplex" },
    { value: "flat_apartment", text: "Apartments/Flats" },
    { value: "terraced", text: "Terraced House" },
    { value: "mansion", text: "Mansion" },
    { value: "penthouse", text: "Penthouse" },
    { value: "semi_detached", text: "Semi Detached" },
    { value: "detached", text: "Detached" },
    { value: "traditional", text: "Traditional House" },
]

let apartments = {
    office: officeTypes,
    residence: residenceTypes
}

export {
    BathroomNumber, SuccessSavedRoom, FailSavedRoom, SittingNumber,
    NameOfSpace, DescOfSpace, KitchenNumber, BedroomNumber, SpaceCategory, SpaceCondition, TypeOfStay,
    apartments,residenceTypes,officeTypes
}










export {
    AddImageView, LocationDiv,
    SpaceAvailabilityDiv, SpaceChargesDiv, SpaceAmenityDiv, FlatmateDiv, SpaceRulesDiv
}