import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../comps/general/comp_mob_footer"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
import { Container } from '@material-ui/core';
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));

let screenMgr = () => {
    if (typeof window !== "undefined") {
        let screenType;
        let screenWidth = screen.width
        if (screenWidth < 992) {
            screenType = "small";
            return { screenType }
        }
        else if (screenWidth >= 992) {
            screenType = "large";
            return { screenType }
        }
    }
}

export default function Home() {
    let { screenType } = screenMgr() || {};
    let indexView = null;
    switch (screenType) {
        case "small":
            indexView = <DynamicMobileComp />
            break;

        case "large":
            indexView = <DynamicPCComp />
            break;
        default:
            indexView = <>Loading...</>
            break;
    }
    return <>
        {indexView}
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
        <Comp_CustomerChatApp />
    </>
}

let MobileView = () => {
    return <>
        <Comp_Mob_Header />
        <IndexBody />
        <Comp_Mob_Footer />
    </>
}

let IndexBody = () => {
    return <>
        <Container maxWidth className="mt-5 pt-5" >
            <Container maxWidth>
                <h1 className="w3-text-white" style={{ backgroundColor: "rgba(0,0,0,0.5)",
                paddingRight:"10",paddingLeft:"10",textAlign:"center" }} >
                    Find Amazing Tenants, Apartments & Investments</h1>
            </Container>
        </Container>
    </>
}

