import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogTitle, Grid, IconButton, Input, InputAdornment, Typography } from "@material-ui/core"
import { Announcement, ArrowBack, Chat, Edit, Label, Person, PowerOff, Settings, } from "@material-ui/icons"
import View from '../view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Loading, LogoSVG, SessionState } from '../reusables';
import { uploader, stateMgr, getImgUrl } from '../../utils/utilFns';
import { OpenedMenu } from "./dashboard/opened_menu"
import { ProfileMenu } from './dashboard/resuables';

let states = stateMgr()

let Comp_Dashboard = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    let [session, loading] = useSession()
    let view = null
    view = <><div className="">Fetching Dashboard data</div></>
    if (session) {
        view = <><View mobileView={<MobileView />} /></>
        return view
    }
    return <><><View mobileView={<MobileView />} /></>
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <HiWelcomer />
        <MyProfile />
        <MyChats />
    </>
}


function HiWelcomer({ }) {
    let [session, loading] = useSession()
    let [loadingState, changeLoadingState] = useState(states.None)
    let [showFull, toggleShowFull] = useState(false)
    /**
     * @type {File} profImgState
     */
    if (session) {
        let user = session.user
        let prof_pic = getImgUrl(user.prof_pic) || "/user_profile.png"
        //changeLoadingState(states.Loaded)
        return <>
            <Container style={{ marginTop: "70px" }}>
                <Grid container>
                    <Grid item container xs={6} >
                        <h3>Hi {session.user.username}</h3>
                    </Grid>
                    <Grid justify="flex-end" item container xs={6}>
                        <img onClick={
                            e => {
                                toggleShowFull(true)
                            }
                        } src={prof_pic} width={70} height={70} style={{ borderRadius: "50%" }} />
                    </Grid>
                </Grid>
            </Container>
            <Dialog open={showFull} onClose={
                () => {
                    toggleShowFull(false)
                }
            } >
                <DialogTitle>Profile Picture</DialogTitle>
                <Container>
                    <Grid justify="center" container style={{ paddingBottom: "10px" }} >
                        <img src={prof_pic} width={250} height={250} style={{ borderRadius: "50%" }} />
                    </Grid>
                </Container>
            </Dialog>
        </>
    }
    return <>
        <Loading state={loadingState} />
    </>
}

function MyProfile({ }) {
    let [session, loading] = useSession()
    if (session) {

        let { f_name, l_name, email, gender, occupation } = session.user
        return <>
            <Container style={{ marginTop: "30px" }}>
                <Grid container direction="row" justify="space-between" alignItems="center" container
                    style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                    <h3>My Profile</h3>
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
                    <h4 style={{}}>{f_name ? f_name : l_name ?
                        l_name : <span style={{ fontStyle: "italic" }}>Full name: Edit your profile</span>}</h4>
                    <h5>{email}</h5>
                    <h5>{gender}</h5>
                    <h5>{occupation || <span style={{ fontStyle: "italic" }} >
                        Occupation: edit your profile</span>}</h5>
                </Grid>
            </Container>
        </>
    }
    return <>
        <p style={{ textAlign: 'center' }} >Loading Bio...</p>
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