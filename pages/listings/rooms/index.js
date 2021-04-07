import { Container, Grid } from "@material-ui/core"
import { ArrowBack, } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { RoomListing } from "../../../comps/comp_rooms"
import { SearchMiniApp, View } from "../index"
export default function Rooms() {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <Container maxWidth="xs" style={{ padding: 0 }} >
            <Grid justify="space-between" alignItems="center" container
                style={{ height: "50px", backgroundColor: "green", marginBottom: "10px", }}>
                <a href="/"> <ArrowBack style={{ color: "white", fontSize: "3em" }} /></a>

            </Grid>
            <Container >
                <SearchMiniApp />
            </Container>
        </Container>
        <br />
        <RoomListing />
    </>
}