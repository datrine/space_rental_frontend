
import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../../comps/general/comp_mob_menu"
import { PCMenu } from '../../comps/general/comp_pc_menu';
import ChatPage from '../../comps/special/chat/chat_page';
import View from '../../comps/view';


export default function Home() {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
    </>
}

let MobileView = () => {
    return <>
        <Comp_Mob_Header />
        <ChatPage />
    </>
}

