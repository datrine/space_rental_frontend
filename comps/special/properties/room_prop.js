import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@material-ui/core";
import { useState } from "react";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import { AddImageView, MySelect } from "./prop_reusable";

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
                <Container>
                    <HouseType />
                </Container>
            </Container>
        </Container>
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

export { RoomProps }