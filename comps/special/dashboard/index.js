import Link from 'next/link';
import Image from "next/image"
import { useContext } from "react"
import { Container, Grid, IconButton, } from "@material-ui/core"
import View from '../../view';
import { ProfileMenu } from './resuables';
import HiWelcomer from './hiwelcomer';
import MyProfile from './myprofile';
import MyPostedAds from './mypostedads';
import { QuickAlert } from '../../resuables';
import { UserSessionContext } from '../../../pages/_app';
import { PCViewTemplate } from '../../general/pcview';

let Comp_Dashboard = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
        <Alerts />
    </>
}

function Alerts() {
    let { session: { user } } = useContext(UserSessionContext)
    let view = null
    let profileAlert = null;
    view = <>
        <div className="">Fetching Dashboard data</div>
    </>
    let isCompleteProfile = user.l_name && user.f_name;
    if (!isCompleteProfile) {
        profileAlert = <QuickAlert msg="Profile is not complete" timerLimit={5000} />
    }
    return <>
        {profileAlert}
    </>
}



function PCView() {
    let compToPC = <Container>
        <HiWelcomer />
        <MyProfile />
        <MyChats />
        <MyPostedAds />
    </Container>

    return <>
        <PCViewTemplate comp={compToPC} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Container disableGutters={true} style={{ marginTop: "70px" }}>
            <HiWelcomer />
            <Grid container direction="column"
                justify="space-evenly"
                alignItems="center" style={{ height: "600px" }} >
                <MyProfile />
                <MyChats />
                <MyPostedAds />
            </Grid>
        </Container>
    </>
}


function MyChats({ userProp = {} }) {
    return <>
        <Container>
            <Grid container direction="row" justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                <h3><a href="/chats" >My Chats</a></h3>
                <IconButton>
                    <Image src={"/dashboard/bx_bx-message-dots.png"} width={30} height={30} />
                </IconButton>
            </Grid>
            <Grid direction="column" container
                style={{
                    padding: 10, borderWidth: 1, borderStyle: "solid",
                    borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
                }} >
                <h4 style={{ fontWeight: "bold" }}>No messages</h4>
            </Grid>
        </Container>
    </>
}

export { Comp_Dashboard }