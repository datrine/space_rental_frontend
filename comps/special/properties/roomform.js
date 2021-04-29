import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Input, InputAdornment,
    makeStyles, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getImgUrl, uploader } from "../../../utils/utilFns";
import { FailReg, MySelect, SuccessReg } from "../../reusables";
import { FlatmateDiv, LocationDiv, SpaceAmenityDiv, SpaceAvailabilityDiv, SpaceChargesDiv, SpaceRulesDiv } from "./prop_reusable";
import { RoomContext } from "./room_prop";

function RoomForm({ roomInfo, changeRoomInfo }) {
    let [responseView, changeResponseView] = useState(null)
    let handleSuccess = (user) => {
        let view = <SuccessReg hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    let handleFail = (err) => {
        let view = <FailReg hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    return <>
        <form onSubmit={async e => {
            e.preventDefault()
            let values = {
                room_pics: room_picsState,
                flatmateInfo: flatmateInfoState,
                spaceInfo: spaceInfoState,
                spaceRules: spaceRulesState,
                locationInfo: locationInfoState,
            }
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
                    changeRoomInfo(room)
                    handleSuccess(room);
                }
            }
        }} >
            <AddImageView />
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
    </>
}

function HouseType({ }) {
    let ctx = useContext(RoomContext)
    let locationInfo = ctx.locationInfo
    let [houseTypeState, changeHouseTypeState] = useState(locationInfo.houseType || "")
    let selectMenuArr = [
        { value: "apartment", text: "Apartment" },
        { value: "flat", text: "Flats" },
    ]
    return <>
        <RoomContext.Provider value={locationInfo} >
            <FormControl fullWidth style={{ marginBottom: "30px" }}>
                <h5 style={{ color: "black", }}>Type of house</h5>
                <Select
                    value={houseTypeState}
                    onChange={e => {
                        let houseType = e.target.value
                        locationInfo.houseType = houseType
                        changeHouseTypeState(houseType)
                        //console.log(ctx) 
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

        </RoomContext.Provider>
    </>
}

function SpaceCategory(params) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let [spaceCategoryState, changeSpaceCategoryState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <MySelect labelTitle="Select category of space" valueProps={spaceCategoryState} selectMenuArr={[
                { value: "apartment", text: "Apartment" },
                { value: "flat", text: "Flats" },
            ]} handleChangeProps={
                e => {
                    let newValue = e.target.value
                    spaceInfo.spaceCategory = newValue
                    console.log(ctx)
                    changeSpaceCategoryState(newValue)
                }
            } /></RoomContext.Provider>
    </>
}

function SpaceCondition(params) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let [spaceCategoryState, changeSpaceCategoryState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <MySelect labelTitle="Select condition of space"
                valueProps={spaceCategoryState} selectMenuArr={[
                    { value: "apartment", text: "Apartment" },
                    { value: "flat", text: "Flats" },
                ]} handleChangeProps={
                    e => {
                        let houseType = e.target.value
                        locationInfo.houseType = houseType
                        changeSpaceCategoryState(houseType)
                    }
                } /></RoomContext.Provider>
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

function BedroomNumber({ }) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let classes = useStyles()
    let [bedroomNumberState, changeBedroomNumberState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <FormControl fullWidth>
                <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
                <Input onChange={e => {
                    let bedroomNumber = e.target.value
                    spaceInfo.bedroomNumber = bedroomNumber
                    changeBedroomNumberState(bedroomNumber)
                }} value={bedroomNumberState}
                    placeholder="No of bedroom" type="number"
                    className={classes.textField} />
            </FormControl>
        </RoomContext.Provider>
    </>
}

function KitchenNumber({ }) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let classes = useStyles()
    let [kitchenNumberState, changeKitchenNumberState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <FormControl fullWidth>
                <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
                <Input onChange={e => {
                    let kitchenNumber = e.target.value
                    spaceInfo.kitchenNumber = kitchenNumber
                    changeKitchenNumberState(kitchenNumber)
                }} value={kitchenNumberState}
                    placeholder="No of kitchen" type="number"
                    className={classes.textField} />
            </FormControl>
        </RoomContext.Provider>
    </>
}

function SittingNumber({ }) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let classes = useStyles()
    let [sittingNumberState, changeSittingNumberState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <FormControl fullWidth>
                <p>Parlour <strong style={{ color: "red" }} > *</strong></p>
                <Input onChange={e => {
                    let sittingNumber = e.target.value
                    spaceInfo.sittingNumber = sittingNumber
                    changeSittingNumberState(sittingNumber)
                }} value={sittingNumberState}
                    placeholder="No of parlour" type="number"
                    className={classes.textField} />
            </FormControl>
        </RoomContext.Provider>
    </>
}

function BathroomNumber({ }) {
    let ctx = useContext(RoomContext)
    let spaceInfo = ctx.spaceInfo
    let classes = useStyles()
    let [bathroomNumberState, changeBathroomNumberState] = useState("")
    return <>
        <RoomContext.Provider value={spaceInfo} >
            <FormControl fullWidth>
                <p>Bedroom <strong style={{ color: "red" }} > *</strong></p>
                <Input onChange={e => {
                    let bathroomNumber = e.target.value
                    spaceInfo.bathroomNumber = bathroomNumber
                    changeBathroomNumberState(bathroomNumber)
                }} value={bathroomNumberState}
                    placeholder="No of bathroom" type="number"
                    className={classes.textField} />
            </FormControl>
        </RoomContext.Provider>
    </>
}

function AddImageView({ }) {
    let ctx = useContext(RoomContext)
    let room_pics = ctx.room_pics
    let [urlsState, changeUrlsState] = useState(room_pics)
    console.log(ctx)
    return <>
        <RoomContext.Provider value={room_pics} >
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
        </RoomContext.Provider>
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
export { RoomForm }