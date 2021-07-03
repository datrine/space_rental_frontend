import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@material-ui/core";
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
import { FooterMenu } from "./descriptions/footer_menu";
import { SpaceContext } from "../../../pages/spaces/[id]";
import { UserSessionContext } from "../../../pages/_app";

/**
 * 
 * @param {space} spaceDataProps 
 * @returns 
 */

export const SpaceToBookContext = createContext({
    spaceToBookData: _.clone({
        spaceId: 0,
        renterId: undefined,
        spaceMeta: {
            datesToStayInfo: {
                dateMode: "asRange",
                singleDatesStrings: [],
                dateRangeStrings: {
                    from: new Date().toDateString(),
                    to: new Date().toDateString()
                }
            }
        }
    }), changeContext: () => { }
});

function SpaceDescription({ spaceDataProps }) {
    let { spaceToBookData } = useContext(SpaceToBookContext)
    let [spaceToBookDataState, changeSpaceToBookDataState] = useState({
        ...spaceToBookData,
        spaceId: spaceDataProps.spaceId ? spaceDataProps.spaceId : spaceDataProps.id,
        renterId: spaceDataProps.renterId
    });
    return <>
        <SpaceContext.Provider value={{ spaceData: spaceDataProps }}>
            <SpaceToBookContext.Provider
                value={{
                    spaceToBookData: spaceToBookDataState,
                    changeContext: changeSpaceToBookDataState
                }} >
                <View mobileView={<MobileView />} />
            </SpaceToBookContext.Provider>
        </SpaceContext.Provider>
    </>
}

function MobileView() {
    let { session: { user } } = useContext(UserSessionContext)
    let { spaceData } = useContext(SpaceContext);
    let isUserViewer = false;
    if (user.id === spaceData.userId) {
        isUserViewer = true;
    }
    return <>
        <CaroImageView />
        <Container>
            <RenterProfile />
            <Desc />
            <Rent />
            <Availability />
            <Location />
            <Amenities />
            <Flatmates />
            <Rules />
        </Container>
        {isUserViewer ? null : <FooterMenu />}
    </>
}
export { SpaceDescription, SpaceContext }