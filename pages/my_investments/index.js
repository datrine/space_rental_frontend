import _ from 'lodash';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { OrderComp } from '../../comps/special/order';
import View from '../../comps/view';
import { UserSessionContext } from '../_app'
import useSWR from "swr"
import { renter } from '../../utils/models/renter';
import { IPanelContext, SpaceContext } from '../../comps/resuables/contextInterfaces';
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid,} from "@material-ui/core";
import { useStyles } from '../../comps/special/profile/styles';
import AlignItemsList from '../../comps/special/space/comps/roomlist';
import { SpaceItem } from '../../comps/special/space/space_item';
import { ProfileMenu } from '../../comps/special/dashboard/resuables';
import { JustAPanel } from '../../comps/resuables';
import qs from 'qs';


export const RenterContext = createContext({
    renterData: _.cloneDeep(renter),
});

function MySpacesPage() {
    let [panelDataState, changePanelDataState] = useState({
        disablePrev: true,
        disableNext: true,
        limit: 5,
        offset: 0
    })
    return <>
        <IPanelContext.Provider value={{ dataOfPanel: panelDataState, changeContext: changePanelDataState }} >
            <RenterContextProvider>
                <MySpaces />
            </RenterContextProvider>
        </IPanelContext.Provider>
    </>
}

function MySpaces() {
    let { session: { user: { userId } } } = useContext(UserSessionContext);
    let { renterData: { id } } = useContext(RenterContext);
    let { dataOfPanel, changeContext } = useContext(IPanelContext);
    let { offset, limit } = dataOfPanel
    let { spacesFromServer, error, loading } = spacesFetcher({ renterId: id, userId, offset, limit });
    let mobileView = <MobileView
        spacesProp={spacesFromServer}
        errorProp={error}
        loadingProp={loading} />
    useEffect(() => {
        if (spacesFromServer) {
            if (spacesFromServer.length < limit) {
                changeContext({ ...dataOfPanel, disableNext: true })
            } else {
                changeContext({ ...dataOfPanel, disableNext: false })
            }
        }
    }, [spacesFromServer]);
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
                <br />
            </SpaceContext.Provider>)}

        </>
    }
    return <>
        <ProfileMenu />
        <Container style={{ marginTop: 70, padding: 0, position: "fixed" }} >
            <Grid justify="center" container
                style={{ width: 300, margin: "auto", backgroundColor: "whitesmoke" }} >
                <JustAPanel />
            </Grid>
            <Container style={{ marginTop: 40, overflow: "auto", height: "65vh" }}>
                <Grid container justify="space-evenly" >
                        {view}
                </Grid>
            </Container>
            <Container
                style={{ bottom: "10px", position: "fixed", paddingTop: "10px" }} >
                <Grid justify="center" container
                    style={{ width: 300, margin: "auto", backgroundColor: "whitesmoke" }} >
                    <JustAPanel />
                </Grid></Container>
        </Container>
    </>
}

function renterFetcher(userId) {
    let { data, error, isValidating } = useSWR(`/api/renters?userId=${userId}`, fetcher, {
        revalidateOnFocus: false,
    })
    if (data) {
        if (Array.isArray(data)) {
            data = data[0]
        }
    }
    return { renterFromServer: data, error, loading: isValidating }
}

function spacesFetcher(opts) {
    let queryString = qs.stringify({ ...opts })
    let { data, error, isValidating } = useSWR(`/api/spaces?${queryString}&mode=inv`, fetcher, {
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
