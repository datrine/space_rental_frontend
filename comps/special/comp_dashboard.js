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
import { procSingleFile, uploader, stateMgr } from '../../utils/utilFns';
import {OpenedMenu} from "./dashboard/opened_menu"

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

function ProfileMenu() {
    let [isCollapsed, toggleCollapsed] = useState(true)
    return <>
        <Container style={{ position: "fixed", top: 0, padding: 0 }}>
            <Grid container style={{ padding: 0 }}>

                <IconButton onClick={
                    e => {
                        toggleCollapsed(!isCollapsed)
                    }
                }><FontAwesomeIcon style={{ color: isCollapsed ? "black" : "red" }}
                    icon={isCollapsed ? faBars : faTimes} /></IconButton>
            </Grid>
        </Container>
        {isCollapsed ? null : <OpenedMenu />}
    </>
}

function HiWelcomer({ name = "Olusola", profImgUrl = "/prof_pic.png" }) {
    let [session, loading] = useSession()
    let [loadingState, changeLoadingState] = useState(states.None)
    let [showFull, toggleShowFull] = useState(false)
    /**
     * @type {File} profImgState
     */
    let [profImgState, changeProfImgState] = useState(null)
    console.log(session)
    if (session) {
        //changeLoadingState(states.Loaded)
        return <>
            <Container style={{ marginTop: "50px" }}>
                <Grid container>
                    <Grid item container xs={6} >
                        <h3>Hi {session.user.username}</h3>
                    </Grid>
                    <Grid justify="flex-end" item container xs={6}>
                        <Image onClick={
                            e => {
                                toggleShowFull(true)
                            }
                        } src={profImgUrl} width={70} height={70} />
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
                    <Grid direction="column" container >
                        <Image src={profImgUrl} width={250} height={250} />
                        <label> <Input type="file" onChange={
                            async e => {
                                let files = e.target.files
                                let formData = new FormData()
                                procSingleFile({ file: files[0], formData, nameOfColumnOnDb: "prof_pic" })
                                let { data, err } = await uploader({
                                    url: `${process.env.NEXT_PUBLIC_CMS_URL}/users/${session.user.id}`,
                                    formData
                                })
                            }
                        } style={{ display: "none" }} />  <IconButton
                            aria-label="toggle password visibility"
                        >
                                <FontAwesomeIcon icon={faImage} />
                            </IconButton>Change Image</label>
                    </Grid>
                </Container>
            </Dialog>
        </>
    }
    return <>
        <Loading state={loadingState} />
    </>
}

function MyProfile({ userProp = {} }) {
    let { name = "Olusola", email = "whoiswho@who.ghh", gender = "Male",
        profImgUrl = "/prof_pic.png" } = userProp
    return <>
        <Container style={{ marginTop: "30px" }}>
            <Grid container direction="row" justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                <h3>My Profile</h3>
                <IconButton>
                    <Image src={"/dashboard/bx_bx-edit.png"} width={30} height={30} />
                </IconButton>
            </Grid>
            <Grid direction="column" container
                style={{
                    padding: 10, borderWidth: 1, borderStyle: "solid",
                    borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
                }} >
                <h4 style={{ fontWeight: "bold" }}>{name}</h4>
                <h5>{email}</h5>
                <h4>{gender}</h4>
                <h4>Realtor</h4>
                <h4 style={{ color: "green" }}>Change password</h4>
            </Grid>
        </Container>
    </>
}

function MyChats({ userProp = {} }) {
    let { name = "Olusola", email = "whoiswho@who.ghh", profImgUrl = "/prof_pic.png" } = userProp
    return <>
        <Container style={{ marginTop: "40px" }}>
            <Grid container direction="row" justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                <h3>My Chats</h3>
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