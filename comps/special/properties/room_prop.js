import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@material-ui/core";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";

function RoomProps(params) {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Banner />
    </>
}

function Banner() {
    return <>
        <Container style={{ backgroundColor: "#60941a", marginTop: "70px" }} >
            <h3 style={{ textAlign: "center", color: "white", paddingTop: "10px" }} >
                <FontAwesomeIcon icon={faDoorOpen} /> <strong>Room Ads</strong></h3>
            <p style={{ textAlign: "center", color: "white", paddingBottom: "10px" }} >
                Post your room ads for potential tenants</p>
        </Container>
    </>
}

function RoomDetails(params) {
    
}


export { RoomProps }