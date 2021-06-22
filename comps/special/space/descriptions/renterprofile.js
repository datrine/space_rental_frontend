import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../../view";
import { useRouter } from "next/router";
import _ from "lodash";
import { space, session, renter } from "../../../../utils/models/exportModels";
import useSWR from 'swr'
import { useSession } from "next-auth/client";
import { getImgUrl } from "../../../../utils/utilFns";
import { UserSessionContext } from "../../../../pages/_app";
import { SpaceContext } from "../index_desc";

let RenterContext = createContext({ renter });

function RenterProfile() {
    let { spaceData } = useContext(SpaceContext);
    let { renterDataFetched, error } = renterFetcher(spaceData.renterId);
    if (error) {
        return <><p>Error loading renter data...</p></>
    }
    if (!renterDataFetched) {
        return <><p>No renter data available...</p></>
    }
    return <>
        <RenterContext.Provider value={{ renter: renterDataFetched }} >
            <Container style={{ marginTop: "10px" }} >
                <Grid container>
                    <Grid item container xs={3} >
                        <img className="rounded-circle" height={70} width={70}
                            src={getImgUrl(renter.prof_pic) || "/user_profile.png"} />
                    </Grid>
                    <Grid item container xs={8}>
                        <Biodata />
                    </Grid>
                </Grid>
            </Container>
        </RenterContext.Provider>
    </>
}

function Biodata(params) {
    let ctx = useContext(RenterContext)
    let { renter: { username } } = ctx;
    return <>
        <h3>{username}</h3>
    </>
}

function renterFetcher(renterId) {
    let { data, error, isValidating } = useSWR(`/api/renters/${renterId}`, fetcher)
    return { renterDataFetched: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { RenterProfile }