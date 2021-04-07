
import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../../comps/general/comp_mob_footer"
import { PCMenu } from '../../comps/general/comp_pc_menu';
import { screenMgr } from '../../utils/utilFns';
import ChatApp from '../../comps/special/chat/comp_chatApp';
import ChatPage from '../../comps/special/chat/chat_page';
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));


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
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
    </>
}

let MobileView = () => {
    console.log("jghjhgjv")
    return <>
        <Comp_Mob_Header />
        <ChatPage />
    </>
}

