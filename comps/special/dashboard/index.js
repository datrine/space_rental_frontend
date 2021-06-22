import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogTitle, Grid, IconButton, Input, InputAdornment, Typography } from "@material-ui/core"
import { Announcement, ArrowBack, Chat, Edit, Label, Person, PowerOff, Settings, } from "@material-ui/icons"
import View from '../../view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Loading, LogoSVG, SessionState } from '../../resuables/reusables';
import { uploader, stateMgr, getImgUrl } from '../../../utils/utilFns';
import { OpenedMenu } from "./opened_menu"
import { ProfileMenu } from './resuables';
import HiWelcomer from './hiwelcomer';
import MyProfile from './myprofile';
import MyPostedAds from './mypostedads';
import { QuickAlert } from '../../resuables';
import { UserSessionContext } from '../../../pages/_app';

let Comp_Dashboard = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    return <>
        <View mobileView={<MobileView />} />
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
        profileAlert =  <QuickAlert msg="Profile is not complete" timerLimit={5000} />
    }
    return <>
        {profileAlert}
    </>
}


function MobileView() {
    return <>
        <ProfileMenu />
        <HiWelcomer />
        <MyProfile />
        <MyChats />
        <MyPostedAds />
    </>
}


function MyChats({ userProp = {} }) {
    return <>
        <Container style={{ marginTop: "40px" }}>
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