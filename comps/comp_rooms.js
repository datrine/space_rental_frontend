import { Container, Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
import { stateMgr } from "../utils/utilFns"
import { ItemTemplate, Loading } from "./reusables"
let states = stateMgr()
function RoomListing() {
    let [roomsState, changeRoomsState] = useState([])
    let [loadingState, changeLoadingState] = useState(states.None)
    useEffect(() => {
        (async () => {
            try {
                changeLoadingState(states.Loading);
                let res = await fetch("/api/rooms/", {
                });
                let { rooms, err } = await res.json();
                if (rooms) {
                    changeRoomsState(rooms)
                    changeLoadingState(states.Loaded)
                }
                else if (err) {
                    console.log(err)
                }
            } catch (e) {
                changeLoadingState(states.Failed)
                console.log(e)
            }
        })()
    }, [])
    return <>
        <Container >
            <Grid container alignItems="flex-start" spacing={2} >
                {
                    roomsState.map(({id, room_pics }, index) => <Grid key={index} xs={12} item sm={4} md={3} >
                       
                            <ItemTemplate id={id} imgSrc={room_pics.map(picInfo => picInfo.url)} />
                     </Grid>)
                }  </Grid>
        </Container>
        <Loading state={loadingState} />
    </>
}

export { RoomListing }