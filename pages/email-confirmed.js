import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../comps/general/comp_mob_footer"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
import { Button, Container, Grid } from '@material-ui/core';
import { SplashScreen } from '../comps/general/comp_splash_screen';
import View from '../comps/view';
import { useEffect, useState } from 'react';
import { appColor, screenMgr } from "../utils/utilFns"
import { ToTheTop } from '../comps/reusables';
import { useRef } from 'react';
import { useRouter } from 'next/router'
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));


export default function Home() {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
        <Comp_CustomerChatApp />
    </>
}

let MobileView = () => {
    let [showFooterState, changeShowFooterState] = useState(true)

    return <>
        <Container onFocus={
            e => {
                if (e.target.type === "text" || e.target.type === "number") {
                    changeShowFooterState(false)
                }
            }
        } onBlur={
            e => {
                changeShowFooterState(true)
            }
        } style={{ padding: 0 }} >
            <Comp_Mob_Header />
            <Body />
            <Comp_Mob_Footer showMenu={showFooterState} />
        </Container>
    </>
}

let Body = () => {
    return <>
        <Container style={{ marginTop: "70px" }} >
            <h3 style={{ textAlign: "center" }} >Thank you for confirming your email address.</h3>
            <p style={{ textAlign: "center" }} >
                <Link href="/dashboard" >
                    <Button style={{ borderRadius: "20px", backgroundColor:appColor, color: "white" }}>
                        Go To Your Dashboard
                    </Button>
                </Link>
            </p>
        </Container>
    </>
}