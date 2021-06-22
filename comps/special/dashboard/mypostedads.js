import Image from "next/image"
import { Container, Grid, IconButton, } from "@material-ui/core"
import { createContext, useContext } from "react";
import { ProfileContext } from "../../../pages/dashboard";
import { space } from "../../../utils/models/space";
import useSWR from "swr";
import { UserSessionContext } from "../../../pages/_app";

export default function MyPostedAds({ }) {

    return <>
        <Container style={{ marginTop: "30px" }}>
            <Grid container direction="row" justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                <h3 >My Posted Ads</h3>
                <IconButton>
                    <a href="/profile" >
                        <Image src={"/dashboard/bx_bx-edit.png"} width={30} height={30} />
                    </a>
                </IconButton>
            </Grid>
            <Grid direction="column" container
                style={{
                    padding: 10, borderWidth: 1, borderStyle: "solid",
                    borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
                }} >
                <CountOffice />
                <CountResidence />
            </Grid>
        </Container>
    </>
}

function CountOffice({ }) {
    let { session } = useContext(UserSessionContext);
    let { count: officeCount, error: errorOfficeCount, loading: loadingOfficeCount } =
        spaceCounter({ userId: session.user.userId, typeOfSpace: "office" });
    let viewOfOfficeCount = null;
    if (errorOfficeCount) {
        viewOfOfficeCount = <h4>Error loading data</h4>
    }
    if (loadingOfficeCount) {
        viewOfOfficeCount = <h4>Loading data</h4>
    }
    if (!officeCount) {
        viewOfOfficeCount = <h4>Data not available</h4>
    }
    else if (officeCount) {
        viewOfOfficeCount = <h4>You posted {officeCount} office{officeCount > 1 ? "s" : ""}</h4>
    }
    return <>
        {viewOfOfficeCount} </>
}

function CountResidence({ }) {
    let { session } = useContext(UserSessionContext);
    let { count: residenceCount, error: errorResidenceCount, loading: loadingResidenceCount } =
        spaceCounter({ userId: session.user.userId, typeOfSpace: "residence" })
    let viewOfResidenceCount = null;
    if (errorResidenceCount) {
        viewOfResidenceCount = <h4>Error loading data</h4>
    }
    else if (loadingResidenceCount) {
        viewOfResidenceCount = <h4>Loading data</h4>
    }
    else  if (!residenceCount) {
        viewOfResidenceCount = <h4>Data not available</h4>
    }
    else if (residenceCount) {
        viewOfResidenceCount = <h4>You posted {residenceCount} residence{residenceCount > 1 ? "s" : ""}</h4>
    }
    return <>
        {viewOfResidenceCount}
    </>
}

function spaceCounter({ userId, typeOfSpace }) {
    let { data, error, isValidating } =
        useSWR(`${process.env. NEXT_PUBLIC_CMS_URL}/spaces/count?userId=${userId}&typeOfSpace=${typeOfSpace}`, fetcher)
    //console.log(data || error || isValidating)
    return { count: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});