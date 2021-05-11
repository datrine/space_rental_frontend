import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../general/comp_mob_menu"
import { Comp_Mob_Footer } from "../general/comp_mob_footer"
import { Comp_CustomerChatApp } from '../general/comp_chat_app';
import { Container, Grid } from '@material-ui/core';
import { SplashScreen } from '../general/comp_splash_screen';
import { useEffect, useState } from 'react';
import { screenMgr } from "../../utils/utilFns"
import { ToTheTop } from '../reusables';
import { useRef } from 'react';

let MobileView = () => {
    let [readyState, changeReadyState] = useState(false)
    let [showFooterState, changeShowFooterState] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            changeReadyState(true)
        }, 2000)
    }, [])
    return <>
        {readyState ? <>
            <Container onFocus={
                e => {
                    if(e.target.type==="text"||e.target.type==="number"){
                    changeShowFooterState(false)
                }
                }
            } onBlur={
                e => {
                    changeShowFooterState(true)
                }
            } style={{ padding: 0 }} >
                <Comp_Mob_Header />
                <IndexBody />
                <Comp_Mob_Footer showMenu={showFooterState} />
            </Container>
        </> : <SplashScreen />}
    </>
}

let IndexBody = () => {
    return <>
        <Container className="mt-5" style={{
            padding: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", backgroundSize: "cover"
        }}>
            <Container style={{
                padding: 0,
                height: 700, backgroundImage: "url('hp_share_apart.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center", backgroundSize: "cover"
            }} >
                <Container maxWidth="xs" style={{
                    paddingTop: 100, height: 700,
                    backgroundColor: "rgba(0,128,0,0.5)"
                }} >
                    <h1 className="w3-text-white" style={{
                        fontSize: "10vw",
                        paddingRight: "10", paddingLeft: "10", textAlign: "center"
                    }} >Share & Find Amazing Tenants,Rooms, Offices & Real Estate Investments</h1>
                </Container>
            </Container>
            <Container maxWidth="xs" className="mb-5 pt-2"  >
                <h2 style={{ textAlign: "center", width: "80%", marginLeft: "10%" }} >
                    Find nearby to stay, work, or available space you can invest on.</h2>
            </Container>
            <Container maxWidth="xs" className="mb-5 pb-5" >
                <Tiles />
                <QuickFind />
            </Container>
            <ToTheTop />
        </Container>
    </>
}

let Tiles = () => {
    let listOf = [{
        link: "/listings/rooms",
        titleOf: "Find a place to stay",
        textOf: "Entire homes, apartment, rooms & more",
        imgSrcOf: "/home_find.png"
    }, {
        link: "/listings/office_spaces",
        titleOf: "Find a place to work",
        textOf: "Entire building, part of an office, & more",
        imgSrcOf: "/workspace_find.png"
    }, {
        link: "/listings/investments",
        titleOf: "Find a real estate investment",
        textOf: "long-term or short-term investment in real esteate space",
        imgSrcOf: "/investment_find.png"
    }, {
        link: "/listings/tenants",
        titleOf: "Find a tenant for your space",
        textOf: "House, Office & more",
        imgSrcOf: "/tenant_find.png"
    },]
    return <>
        {listOf.map(({ link, titleOf, textOf, imgSrcOf }, index) =>
            <a href={link} key={index} style={{ textDecoration: "none" }} >
                <Container className="w3-card"
                    style={{
                        width: "96%", marginLeft: "2%", marginRight: "2%", marginBottom: "15px", borderStyle: "solid",
                        borderWidth: 1, borderRadius: "20px", boxShadow: "10px 10px grey"
                    }} >
                    <Grid container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={10} sm={11} >
                            <h5 style={{ fontWeight: "bold" }}>
                                {titleOf.length > 44 ? (titleOf.substring(0, 40) + "...") : titleOf}
                            </h5>
                            <p>{textOf}</p>
                        </Grid>
                        <Grid item xs={2} sm={1} container direction="column" justify="flex-end" alignItems="center" >
                            <img width={50} height={50} src={imgSrcOf} />
                        </Grid>
                    </Grid>
                </Container>
            </a>)}  </>
}

let QuickFind = () => {
    return <>
    </>
}

export default MobileView