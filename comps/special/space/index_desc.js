import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import { useRouter } from "next/router";
import _ from "lodash";
import { CaroImageView } from "./descriptions/caro_space";
import { space, session } from "../../../utils/models/exportModels";
import useSWR from 'swr'
import { useSession } from "next-auth/client";
import { RenterProfile } from "./descriptions/renterprofile";
import { Desc } from "./descriptions/desc";

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
    spaceAmenities: [{ id: "", desc: "Shared Living Room" }], ...space
};


export const SpaceContext = React.createContext({
    spaceData: _.cloneDeep(space),
});
export const UserSessionContext = React.createContext({
    session: _.cloneDeep(session),
});

/**
 * 
 * @param {space} spaceDataProps 
 * @returns 
 */
function SpaceDescription() {
    let { query:{ id}} = useRouter();
    let { data: spaceDataFetched, error } = useSWR(`/api/spaces/${id}`)
    if (error) {
        return <>
            <p>Error loading data...</p>
        </>
    }
    if (!spaceDataFetched) {
        return <>

        </>
    }
    return <>
        <SpaceContext.Provider value={{ spaceData: spaceDataFetched }} >
            <View mobileView={<MobileView />} />
        </SpaceContext.Provider>
    </>
}

function MobileView() {
    return <>
        <CaroImageView />
        <RenterProfile/>
        <Desc/>
    </>
}
export { SpaceDescription }