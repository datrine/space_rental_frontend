import {Container} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import {  SpaceFormEdit } from "./comps/spaceform_edit";
import { useRouter } from "next/router";
import _ from "lodash";
import { SpaceContext } from "../../resuables/contextInterfaces";
import { Banner, ControlPanel } from "./reusables";

export let spaceDataDefault = {
    nameOfSpace: "",
    descOfSpace: "",
    typeOfSpace: "",
    spaceInfo: {
        houseType: "", spaceCategory: "", spaceCondition: "",
        bedroomNumber: 1, bathroomNumber: 1, kitchenNumber: 0, sittingNumber: 0
    },
    flatmateInfo: [],
    spaceRules: [{ desc: "Pets allowed" }, { desc: "Smoking allowed" }, { desc: "Couple allowed" }],
    locationInfo: {},
    space_pics: [],
    spaceAvailabiltyInfo: { lengthOfStay: 1, datesInfo: {} },
    spaceBills: { charge: 0, otherBills: 0, billFormat: "day" },
    spaceAmenities: [{ id: "", desc: "Shared Living Room" }]
};

function SpacePropsEdit(params) {
    let { query } = useRouter()
    let { spaceData } = useContext(SpaceContext)
    let [spaceDataState, changeSpaceDataState] = useState({ ...spaceData })
    
    return <>
        <SpaceContext.Provider value={{
            spaceData: spaceDataState,
            changeSpaceContext: changeSpaceDataState
        }} >
            <View mobileView={<MobileView />} pcView={<MobileView />} />
        </SpaceContext.Provider>
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Banner />
        <SpaceDetails />
    </>
}

function SpaceDetails({ }) {
    return <>
        <Container style={{ marginTop: "20px" }}>
            <Container
                style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a", padding: 0 }}>
                <h3 style={{
                    color: "white", backgroundColor: "#60941a",
                    paddingTop: "5px", paddingLeft: "5px"
                }}>Space Detail</h3>

                <SpaceFormEdit />
            </Container>
        </Container>
    </>
}

export { SpacePropsEdit }