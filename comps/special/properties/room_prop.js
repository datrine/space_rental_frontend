import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Input, InputAdornment,
    makeStyles, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import { useStyles } from "../profile/styles";
import { RoomForm } from "./roomform";
import AlignItemsList from "./roomlist";

export let roomDataDefault = {
    nameOfSpace: "",
    descOfSpace: "",
    spaceInfo: {
        houseType: "", spaceCategory: "", spaceCondition: "",
        bedroomNumber: 1, bathroomNumber: 1, kitchenNumber: 0, sittingNumber: 0
    },
    flatmateInfo: [],
    spaceRules: [{ desc: "Pets allowed" }, { desc: "Smoking allowed" }, { desc: "Couple allowed" }],
    locationInfo: {},
    room_pics: [],
    spaceAvailabiltyInfo: { lengthOfStay: 1, datesInfo: {} },
    spaceBills: { charge: 0, otherBills: 0, billFormat: "day" },
    spaceAmenities: [{ id: "", desc: "Shared Living Room" }]
};

export const RoomContext = React.createContext({ roomData: roomDataDefault, changeRoomContext: () => { } });

function RoomProps(params) {
    let ctx = useContext(RoomContext)
    let [roomDataState, changeContext] = useState({ ...ctx.roomData })
    return <>
        <RoomContext.Provider value={{ roomData: roomDataState, changeRoomContext: changeContext }} >
            <View mobileView={<MobileView />} />
        </RoomContext.Provider>
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Banner />
        <ControlPanel />
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

function ControlPanel(params) {
    let [templateState, changeTemplateState] = useState("create")
    let [openRoomListDialog, changeRoomListDialog] = useState(false)
    useEffect(() => {
        if (templateState === "edit") {
            changeRoomListDialog(true)
        }
    }, [templateState])
    return <>
        <Container>
            <SetRoomTemplateMode roomTemplate={templateState}
                hookChangeTemplateState={changeTemplateState} />
            {templateState === "edit" ? <Button onClick={e => {
                if (templateState !== "edit") {
                    changeTemplateState("edit")
                } else {
                    changeRoomListDialog(true)
                }
            }} style={{backgroundColor:"#60941a",
            marginLeft:"10px",color:"white"}} >Show Room List</Button> : null}
        </Container>
        <RoomList openRoomListDialog={openRoomListDialog} hookRoomListDialog={changeRoomListDialog} />
    </>
}

function RoomDetails({ roomInfo, changeRoomInfo }) {
    return <>
        <Container style={{ marginTop: "20px" }}>
            <Container
                style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a", padding: 0 }}>
                <h3 style={{
                    color: "white", backgroundColor: "#60941a",
                    paddingTop: "5px", paddingLeft: "5px"
                }}>Room Detail</h3>

                <RoomForm />
            </Container>
        </Container>
    </>
}

function SetRoomTemplateMode({ roomTemplate, hookChangeTemplateState }) {
    let classes = useStyles()
    let templates = [
        { value: "create", text: "Create" },
        { value: "edit", text: "Edit" },
    ]
    return <>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        hookChangeTemplateState(e.target.value)
                        //handleChangeProps(e)
                    }, value: roomTemplate, name: "roomtemplate"
                }}
            >
                {templates.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select>
        

    </>

}

let RoomList = ({ openRoomListDialog, hookRoomListDialog }) => {
    let handleClose = (e) => {
        hookRoomListDialog(false)
    }
    return <>
        <Dialog
            open={openRoomListDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Rooms</DialogTitle>
            <DialogContent>
                <Container style={{ padding: 0 }} >
                    <AlignItemsList hookRoomListDialog={hookRoomListDialog} />
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

export { RoomProps }