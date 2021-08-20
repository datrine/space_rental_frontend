import { Comp_Mob_Header } from "../general/comp_mob_menu"
import { Comp_Mob_Footer } from "../general/comp_mob_footer"
import { Container, Grid } from '@material-ui/core';
import { SplashScreen } from '../general/comp_splash_screen';
import { useEffect, useState } from 'react';
import { ToTheTop } from '../resuables/index';
import { Tiles } from './reusables';

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
                <Container style={{
                    paddingTop: 100, height: 700, width: "100vw",
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

let QuickFind = () => {
    return <>
    </>
}

export default MobileView