import { Container, Grid } from "@material-ui/core"
import { ArrowBack, } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { SearchMiniApp, ItemTemplate, View } from "../index"
export default function Rooms() {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <Container maxWidth style={{ padding: 0 }} >
            <Grid justify="space-between" alignItems="center" container
                style={{ height: "50px", backgroundColor: "green", marginBottom: "10px", }}>
                <a href="/"> <ArrowBack style={{ color: "white", fontSize: "3em" }} /></a>

            </Grid>
            <Container >
                <SearchMiniApp />
            </Container>
        </Container>
        <br/>
        <Listing />
    </>
}

function Listing() {
    let [roomsState, changeRoomsState] = useState([])
    useEffect(() => {
        (async () => {
            try {
                let res = await fetch("/api/rooms/", {
                });
                let { rooms, err } = await res.json();
                if (rooms) {
                    console.log(rooms)
                    changeRoomsState(rooms)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])
    return <>
        {
            roomsState.map(({ }, index) => <Container key={index} >
                <ItemTemplate />
                </Container>)
        }
    </>
}