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
import { Rent } from "./descriptions/rent";
import { Availability } from "./descriptions/availability";
import { Location } from "./descriptions/location";
import { Amenities } from "./descriptions/amenities";
import { Flatmates } from "./descriptions/flatmates";
import { Rules } from "./descriptions/rules";
import { UserSessionContext,SpaceContext } from "../../../utils/contexts";

export {UserSessionContext,SpaceContext}

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
        <Rent/>
        <Availability/>
        <Location/>
        <Amenities/>
        <Flatmates/>
        <Rules/>
    </>
}
export { SpaceDescription }