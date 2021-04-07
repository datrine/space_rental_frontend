import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { Button, Container, Grid, IconButton, Typography } from "@material-ui/core"
import { ArrowBack, Edit, } from "@material-ui/icons"
import View from '../view';
import { Comp_Mob_Header } from "../general/comp_mob_menu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
        <Container style={{ position: "fixed", top: 0,padding:0 }}>
            <Grid container style={{padding:0}}>
                
                <IconButton size="large" onClick={
                    e => {
                        toggleCollapsed(!isCollapsed)
                    }
                }><FontAwesomeIcon style={{ color: isCollapsed ? "black" : "red" }}
                    icon={isCollapsed ? faBars : faTimes} /></IconButton>
            </Grid>
        </Container>
    </>
}

function OpenedMenu(){
    return<></>
}

function HiWelcomer({ name = "Olusola", profImgUrl = "/prof_pic.png" }) {
    return <>
        <Container style={{ marginTop: "100px" }}>
            <Grid container>
                <Grid item container xs={6} >
                    <h3>Hi {name}</h3>
                </Grid>
                <Grid item container xs={6}>
                    <Image
                        layout="responsive" src={profImgUrl} width={70} height={70} />
                </Grid>
            </Grid>
        </Container>
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