import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Input, InputAdornment,
    makeStyles, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
//import { getImgUrl, uploader } from "../../../utils/utilFns";
import { FailReg, MySelect, SuccessReg } from "../../reusables";
import {
    FlatmateDiv, LocationDiv, SpaceAmenityDiv, SpaceAvailabilityDiv, SpaceChargesDiv,
    SpaceRulesDiv, AddImageView
} from "./prop_reusable";
import { RoomContext, roomDataDefault } from "./room_prop";

function RoomForm({ roomInfo, changeRoomInfo }) {
    let [responseView, changeResponseView] = useState(null)
    let ctx = useContext(RoomContext)
    let handleSuccess = (user) => {
        let view = <SuccessSavedRoom openDialog={true} hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    let handleFail = (err) => {
        let view = <FailSavedRoom openDialog={true} hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    return <>
        <form onSubmit={
            async e => {
                e.preventDefault()
                let values = {
                    ...ctx
                }
                console.log(values)
                let res;
                //no room info exists for current room=>mode:edit
                if (roomInfo) {
                    res = await fetch(`/api/rooms/${roomInfo.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    });
                }
                //no room info exists for current room=>mode:create
                else {
                    res = await fetch("/api/rooms", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    });
                }

                if (res.ok) {
                    let data = await res.json();
                    let { err, room, jwt } = data;
                    if (err) {
                        console.log(err)
                        handleFail(err)
                    }
                    if (room) {
                        console.log(room)
                        handleSuccess(room);
                    }
                }
            }} >
            <AddImageView />
            <Container style={{ marginTop: "20px" }}>
                <NameOfRoom />
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
                    <Grid item container xs={5}>
                        <BathroomNumber />
                    </Grid>
                </Grid>
                <LocationDiv />
                <SpaceAvailabilityDiv />
                <SpaceAmenityDiv />
                <SpaceChargesDiv />
                <FlatmateDiv />
                <SpaceRulesDiv />
                <p style={{ marginTop: "10px" }}>
                    <Button type="submit" style={{ color: "white", backgroundColor: "#60941a" }} >Post  Ad</Button></p>
            </Container>
        </form>
        {responseView}
    </>
}

function HouseType({ }) {
    let selectMenuArr = [
        { value: "apartment", text: "Apartment" },
        { value: "flat", text: "Flats" },
    ]
    return <>
        <RoomContext.Consumer>
            {({ roomData, changeRoomContext }) => <FormControl fullWidth style={{ marginBottom: "30px" }}>
                <h5 style={{ color: "black", }}>Type of house</h5>
                <Select
                    value={roomData.spaceInfo.houseType}
                    onChange={e => {
                        let houseType = e.target.value
                        roomData.spaceInfo.houseType = houseType
                        changeRoomContext({ ...roomData })
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{
                        marginBottom: "5px",
                        paddingLeft: "5px",
                        borderWidth: 0.5,
                        borderBottomStyle: "solid",
                        //borderRadius: "5px"
                    }}

                >
                    {selectMenuArr.map(({ value, text }, index) => <MenuItem
                        key={index} value={value} >{text}</MenuItem>)}
                </Select></FormControl>
            }
        </RoomContext.Consumer>
    </>
}

function SpaceCategory(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceInfo = roomData.spaceInfo
    return <>
        <MySelect labelTitle="Select category of space" valueProps={spaceInfo.spaceCategory} selectMenuArr={[
            { value: "apartment", text: "Apartment" },
            { value: "flat", text: "Flats" },
        ]} handleChangeProps={
            e => {
                let newValue = e.target.value
                spaceInfo.spaceCategory = newValue
                changeRoomContext({ ...roomData, spaceInfo })
            }
        } />
    </>
}

function SpaceCondition(params) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let { spaceInfo } = roomData
    return <>
        <MySelect labelTitle="Select condition of space"
            valueProps={spaceInfo.spaceCondition} selectMenuArr={[
                { value: "apartment", text: "Apartment" },
                { value: "flat", text: "Flats" },
            ]} handleChangeProps={
                e => {
                    let houseType = e.target.value
                    spaceInfo.spaceCondition = houseType
                    changeRoomContext({ ...roomData, spaceInfo })
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

function NameOfRoom({ }) {
    let classes = useStyles()
    let ctx = useContext(RoomContext);
    let { roomData, changeRoomContext } = ctx
    let handleChange = (e) => {
        roomData.nameOfSpace = e.target.value
        changeRoomContext({ ...roomData })
    }
    return <>
        <FormControl fullWidth style={{ marginBottom: 20, marginTop: 10 }} >
            <TextField fullWidth multiline={true} onChange={handleChange}
                name="name" placeholder="Name the space"
                className={classes.textField} />
        </FormControl>
    </>
}

function BedroomNumber({ }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let { spaceInfo } = roomData
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let bedroomNumber = e.target.value
                spaceInfo.bedroomNumber = bedroomNumber
                changeRoomContext({ ...roomData, spaceInfo })
            }} value={spaceInfo.bedroomNumber}
                placeholder="No of bedroom" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function KitchenNumber({ }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceInfo = roomData.spaceInfo
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let kitchenNumber = e.target.value
                spaceInfo.kitchenNumber = kitchenNumber
                changeRoomContext({ ...roomData, spaceInfo })
            }} value={spaceInfo.kitchenNumber}
                placeholder="No of kitchen" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

function SittingNumber({ }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceInfo = roomData.spaceInfo
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Parlour <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let sittingNumber = e.target.value
                spaceInfo.sittingNumber = sittingNumber
                changeRoomContext({ ...roomData, spaceInfo })
            }} value={spaceInfo.sittingNumber}
                placeholder="No of parlour" type="number"
                className={classes.textField} />
        </FormControl>

    </>
}

function BathroomNumber({ }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let { spaceInfo } = roomData
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
            <Input onChange={e => {
                let bathroomNumber = e.target.value
                spaceInfo.bathroomNumber = bathroomNumber
                changeRoomContext({ ...ctx })
            }} value={spaceInfo.bathroomNumber}
                placeholder="No of bathroom" type="number"
                className={classes.textField} />
        </FormControl>
    </>
}

let SuccessSavedRoom = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(openDialog)
    let ctx = useContext(RoomContext)
    let handleClose = (e) => {
        ctx.changeRoomContext({ ...roomDataDefault })
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
                    <h4 style={{ textAlign: "center" }}>A Room Ad Has Been Successfully Added</h4>
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
                    Unable to register. Please reload page.
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

export { RoomForm }