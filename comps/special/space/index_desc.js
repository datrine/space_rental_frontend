import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
} from "@material-ui/core";
import React, { createContext, useContext } from "react";
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
import { FooterMenu } from "./descriptions/reusuables";
import { SpaceContext } from "../../../pages/spaces/[id]";

/**
 * 
 * @param {space} spaceDataProps 
 * @returns 
 */

export const SpaceToBookContext = createContext({
    spaceToBookData: _.clone({
        spaceId: 0,
        datesToStayInfo: {
            dateMode: "asRange",
            singleDatesStrings: [],
            dateRangeStrings: {
                from: new Date().toDateString(),
                to: new Date().toDateString()
            }
        }
    }), changeContext: () => { }
});

function SpaceDescription() {
    let { spaceData } = useContext(SpaceContext);
    let { spaceToBookData } = useContext(SpaceToBookContext)
    let [spaceToBookDataState, changeSpaceToBookDataState] = useState({
        ...spaceToBookData,
        spaceId: spaceData.id,
    });
    console.log(spaceToBookDataState)
    return <>
        <SpaceToBookContext.Provider
            value={{
                spaceToBookData: spaceToBookDataState,
                changeContext: changeSpaceToBookDataState
            }} >
            <View mobileView={<MobileView />} />
        </SpaceToBookContext.Provider>
    </>
}

function MobileView() {
    return <>
        <CaroImageView />
        <RenterProfile />
        <Desc />
        <Rent />
        <Availability />
        <Location />
        <Amenities />
        <Flatmates />
        <Rules />
        <FooterMenu />
    </>
}
export { SpaceDescription,SpaceContext }