import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Input, InputAdornment,
    makeStyles, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useEffect, useState } from "react";
import { FailReg, MySelect, SuccessReg } from "../../reusables";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import { useStyles } from "../profile/styles";
import { AddImageView, FlatmateDiv, LocationDiv, SpaceAmenityDiv, SpaceAvailabilityDiv, SpaceChargesDiv, SpaceRulesDiv } from "./prop_reusable";
import { RoomForm } from "./roomform";
import AlignItemsList from "./roomlist";
import CustomPaginationActionsTable from "./tables";
let roomData = {
    spaceInfo:{},
    flatmateInfo:{},
    spaceRules:[],
    locationInfo:{},
    room_pics:[],
    spaceAvailabiltyInfo:{},
}
export const RoomContext = React.createContext(roomData)
function RoomProps(params) {
    return <>
        <View mobileView={<MobileView />} />
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
            }}  >Show Room List</Button> : null}
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
        <Container style={{ marginBottom: "10px", display: "inline-block" }}>
            <h5 style={{ color: "black", }}>Select Mode</h5>
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
        </Container>

    </>

}

let RoomList = ({ openRoomListDialog, hookRoomListDialog }) => {
    let handleClose = (e) => {
        console.log("ijuijjioj")
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
                    <AlignItemsList />
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