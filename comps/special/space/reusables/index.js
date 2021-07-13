import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,
     MenuItem, Select, 
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useStyles } from "../../profile/styles";
import AlignItemsList from "../comps/roomlist";

function Banner() {
    return <>
        <Container style={{ backgroundColor: "#60941a"}} >
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
            }} style={{
                backgroundColor: "#60941a",
                marginLeft: "10px", color: "white"
            }} >Show Room List</Button> : null}
        </Container>
        <SpaceList openRoomListDialog={openRoomListDialog} hookRoomListDialog={changeRoomListDialog} />
    </>
}

function SetRoomTemplateMode({ roomTemplate, hookChangeTemplateState }) {
    let classes = useStyles()
    let templates = [
        { value: "", text: "Select mode" },
        { value: "create", text: "Create" },
        { value: "edit", text: "Edit" },
    ]
    return <>
        <Select
            displayEmpty
            inputProps={{
                'aria-label': 'Without label',
                onChange: e => {
                    hookChangeTemplateState(e.target.value)
                    //handleChangeProps(e)
                }, value: roomTemplate, name: "roomtemplate"
            }} style={{ width: "100px" }}
        >
            {templates.map(({ value, text }, index) => <MenuItem
                key={index} value={value} >{text}</MenuItem>)}
        </Select>


    </>

}

let SpaceList = ({ openRoomListDialog, hookRoomListDialog }) => {
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

let urlCleanup = (queryObj) => {
    let { spaceType, } = queryObj
    let typeOfSpace = "";
    switch (spaceType) {
        case "residence":
            typeOfSpace = "residence"
            break;

        case "office":
            typeOfSpace = "office"
            break;

        default:
            typeOfSpace = "residence"
            break;
    }
    return { typeOfSpace }
}

export {ControlPanel, Banner,SetRoomTemplateMode ,SpaceList,urlCleanup}