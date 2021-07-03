import _ from 'lodash';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { OrderComp } from '../../comps/special/order';
import View from '../../comps/view';
import { UserSessionContext } from '../_app'
import useSWR from "swr"
import { renter } from '../../utils/models/renter';
import { SpaceContext } from '../../comps/resuables/contextInterfaces';
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,
    makeStyles, MenuItem, Select,
} from "@material-ui/core";
import { useStyles } from '../../comps/special/profile/styles';
import AlignItemsList from '../../comps/special/space/comps/roomlist';
import { SpaceItem } from '../../comps/special/space/space_item';
import { ProfileMenu } from '../../comps/special/dashboard/resuables';


export const RenterContext = createContext({
    renterData: _.cloneDeep(renter),
});

function MySpacesPage() {
    return <>
        <RenterContextProvider>
            <MySpaces />
        </RenterContextProvider>
    </>
}

function MySpaces() {
    let { renterData: { id } } = useContext(RenterContext);
    let { spacesFromServer, error, loading } = spacesFetcher(id);
    let mobileView = <MobileView
        spacesProp={spacesFromServer}
        errorProp={error}
        loadingProp={loading} />
    return <>
        <View mobileView={mobileView} />
    </>
}

function RenterContextProvider({ children }) {
    let { session: { user } } = useContext(UserSessionContext);
    let { renterFromServer, error, loading } = renterFetcher(user.id);
    let view = null;
    if (loading) {
        view = <>{children} </>
    }

    if (error) {
        view = <>{children}</>
    }

    if (renterFromServer) {
        view = <>
            <RenterContext.Provider value={{ renterData: renterFromServer }}>
                {children}
            </RenterContext.Provider>
        </>
    }
    return <>
        {view}
    </>
}


function MobileView({ loadingProp, errorProp, spacesProp }) {
    let view = null;
    if (loadingProp) {
        view = <>
            <p>Loading</p>
        </>
    }
    if (errorProp) {
        view = <>
            <p>Error loading</p>
        </>
    }
    if (spacesProp) {
        view = <>
            {spacesProp.map((spaceData, index) => <SpaceContext.Provider
                value={{ spaceData }}
                key={index} >
                <SpaceItem />
            </SpaceContext.Provider>)}

        </>
    }
    return <>
    <ProfileMenu/>
        {view}
    </>
}

function renterFetcher(userId) {
    let { data, error, isValidating } = useSWR(`/api/renters?userId=${userId}`, fetcher,{
        revalidateOnFocus: false,})
    if (data) {
        if (Array.isArray(data)) {
            data = data[0]
        }
    }
    return { renterFromServer: data, error, loading: isValidating }
}

function spacesFetcher(renterId) {
    let { data, error, isValidating } = useSWR(`/api/spaces?renterId=${renterId}`, fetcher, {
        revalidateOnFocus: false,
    })
    //console.log(data || error || isValidating)
    return { spacesFromServer: data, error, loading: isValidating }
}


let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default MySpacesPage;

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
