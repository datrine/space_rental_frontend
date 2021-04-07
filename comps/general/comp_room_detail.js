import { Container, Grid } from "@material-ui/core"
import { FullCarouseler, LowerBandBtn, Overview, OwnerDesc, QuickBio, Title } from "./mobile_detail_reusable";
const { default: View } = require("../view");

export default function RoomDetail() {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <Container fullWidth style={{ padding: 0 }} >
            <FullCarouseler />
            <Title />
            <QuickBio />
            <OwnerDesc />
            <Overview />
        </Container>
        <LowerBandBtn />
    </>
}


export { RoomDetail as Detail }