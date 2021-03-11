import { Avatar, Grid } from "@material-ui/core"
import Link from "next/link"

export default function MessagesStack({ ...propsFromParent }) {
    return <>
        <Message chatId={1} {...propsFromParent} />
        <Message chatId={1} {...propsFromParent} />
        <Message chatId={1} {...propsFromParent} />
        <Message chatId={1} {...propsFromParent} />
    </>
}

function Message({ chatId, hookChangeTabValue }) {
    return <>
        <Link href={"/chats/" + chatId} >
            <Grid container spacing={1} style={{
                borderBottomWidth: "2px",
                borderBottomStyle: "solid", marginBottom: "5px", marginTop: "5px"
            }} >
                <Grid item xs={2}>
                    <Avatar>H</Avatar>
                </Grid>
                <Grid container item xs={10}>
                    <Grid container item xs={12} justify="space-around" >
                        <span style={{ fontSize: "20px" }} >dffgtgthgt</span>
                        <span>02:56pm</span>
                    </Grid>
                    <Grid container item xs={12}>
                        <span>AQasrdb hghvbyhyhb bvhvbhvbhbh</span>
                    </Grid>
                </Grid>
            </Grid>
        </Link>   </>
}